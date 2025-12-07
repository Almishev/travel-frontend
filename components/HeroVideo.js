import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  @media (max-width: 768px) {
    body.menu-open & {
      display: none;
    }
  }
`;

const Video = styled.video`
  position: static;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  min-height: 400px;
  height: 65vh;
  
  @media (max-width: 768px) {
    min-height: 350px;
    height: 55vh;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Poster = styled.div`
  position: absolute;
  inset: 0;
  background-color: #000;
  transition: opacity 0.4s ease;
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  pointer-events: none;
  /* Оптимизация за по-бързо зареждане */
  will-change: opacity;
`;

const Overlay = styled.div`
  position: absolute;
  left: 50%;
  bottom: 12%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  max-width: 90%;

  h1 {
    font-size: 40px;
    line-height: 1.1;
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 18px;
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    bottom: 10%;
    h1 { font-size: 24px; }
    p { font-size: 14px; }
  }
`;

const ButtonCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 28px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateY(0);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: #fff;
    color: #b8860b;
    border-color: #fff;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 20px;
    
    &:hover {
      transform: translateY(-2px) scale(1.03);
    }
  }
`;

const defaultSettings = {
  heroMediaType: 'video',
  heroVideoDesktop: '',
  heroVideoMobile: '',
  heroImage: '',
  heroTitle: 'Туристическа агенция',
  heroSubtitle: 'организираме разнообразни пътувания и екскурзии',
};

export default function HeroVideo({ heroSettings }) {
  const initialSettings = {
    ...defaultSettings,
    ...(heroSettings || {}),
  };

  const [settings] = useState(initialSettings);
  const [currentVideo, setCurrentVideo] = useState(
    initialSettings.heroVideoDesktop || initialSettings.heroVideoMobile || ''
  );
  const [videoReady, setVideoReady] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const updateVideoSource = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Ако е избрана снимка, не показваме видео
    if (settings.heroMediaType === 'image') {
      setCurrentVideo('');
      return;
    }
    
    // Ако е избрано видео, показваме според устройството
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && settings.heroVideoMobile) {
      setCurrentVideo(settings.heroVideoMobile);
    } else if (settings.heroVideoDesktop) {
      setCurrentVideo(settings.heroVideoDesktop);
    } else if (settings.heroVideoMobile) {
      // Fallback to mobile video if desktop is not available
      setCurrentVideo(settings.heroVideoMobile);
    } else {
      setCurrentVideo('');
    }
  }, [settings.heroMediaType, settings.heroVideoDesktop, settings.heroVideoMobile]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateVideoSource();

    const handleResize = () => {
      updateVideoSource();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateVideoSource]);

  // Intersection Observer за lazy loading на видеото
  useEffect(() => {
    if (!videoWrapperRef.current || !currentVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Започваме да зареждаме 50px преди да влезе в viewport
        threshold: 0.1,
      }
    );

    observer.observe(videoWrapperRef.current);

    return () => {
      if (videoWrapperRef.current) {
        observer.unobserve(videoWrapperRef.current);
      }
    };
  }, [currentVideo]);

  useEffect(() => {
    // Update video source when currentVideo changes и когато трябва да се зареди
    if (videoRef.current && currentVideo && shouldLoadVideo) {
      videoRef.current.load(); // Reload video with new source
    }
  }, [currentVideo, shouldLoadVideo]);

  // Показваме снимка ако е избран тип 'image'
  if (settings.heroMediaType === 'image' && settings.heroImage) {
    const isS3Image = settings.heroImage?.includes('s3.amazonaws.com') || 
                      settings.heroImage?.includes('s3.eu-central-1.amazonaws.com') ||
                      settings.heroImage?.includes('amazonaws.com');
    
    // Debug logging
    if (typeof window !== 'undefined') {
      console.log('Hero image settings:', {
        heroMediaType: settings.heroMediaType,
        heroImage: settings.heroImage,
        isS3Image: isS3Image
      });
    }
    
    return (
      <VideoWrapper ref={videoWrapperRef}>
        <ImageWrapper>
          <Image
            src={settings.heroImage}
            alt={settings.heroTitle}
            width={1920}
            height={1080}
            priority
            unoptimized={isS3Image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              console.error('Error loading hero image:', settings.heroImage);
              console.error('Error details:', e);
              // Fallback to black background if image fails to load
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Hero image loaded successfully:', settings.heroImage);
            }}
          />
        </ImageWrapper>
        <Overlay>
          <div>
            <h1>{settings.heroTitle}</h1>
            <p>{settings.heroSubtitle}</p>
          </div>
          <Link href="/trips" passHref legacyBehavior>
            <ButtonCTA>
              Разгледайте екскурзиите
            </ButtonCTA>
          </Link>
        </Overlay>
      </VideoWrapper>
    );
  }

  // Показваме видео ако е избран тип 'video-desktop' или 'video-mobile'
  return (
    <VideoWrapper ref={videoWrapperRef}>
      <Poster hidden={videoReady && shouldLoadVideo} />
      {currentVideo && shouldLoadVideo && (
        <Video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          key={currentVideo} // Force re-render when video changes
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={currentVideo} type="video/mp4" />
        </Video>
      )}
      <Overlay>
        <div>
          <h1>{settings.heroTitle}</h1>
          <p>{settings.heroSubtitle}</p>
        </div>
        <Link href="/trips" passHref legacyBehavior>
          <ButtonCTA>
            Разгледайте екскурзиите
          </ButtonCTA>
        </Link>
      </Overlay>
    </VideoWrapper>
  );
}


