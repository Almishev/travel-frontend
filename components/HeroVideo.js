import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-height: 260px;

  @media (min-width: 768px) {
    min-height: 420px;
  }

  @media (max-width: 768px) {
    body.menu-open & {
      display: none;
    }
  }
`;

const Video = styled.video`
  position: static;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Poster = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/hero-poster.jpg');
  background-size: cover;
  background-position: center;
  transition: opacity 0.4s ease;
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  pointer-events: none;
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
  border: 1px solid #fff;
  border-radius: 5px;
  font-size: 1rem;
  padding: 10px 22px;
  transition: opacity .2s ease;
  &:hover { opacity: .9; }
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

const defaultSettings = {
  heroVideoDesktop: '',
  heroVideoMobile: '',
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
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateVideoSource();

    const handleResize = () => {
      updateVideoSource();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [settings.heroVideoDesktop, settings.heroVideoMobile]);

  useEffect(() => {
    // Update video source when currentVideo changes
    if (videoRef.current && currentVideo) {
      videoRef.current.load(); // Reload video with new source
    }
  }, [currentVideo]);

  function updateVideoSource() {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && settings.heroVideoMobile) {
      setCurrentVideo(settings.heroVideoMobile);
    } else if (settings.heroVideoDesktop) {
      setCurrentVideo(settings.heroVideoDesktop);
    } else if (settings.heroVideoMobile) {
      // Fallback to mobile video if desktop is not available
      setCurrentVideo(settings.heroVideoMobile);
    }
  }

  return (
    <VideoWrapper>
      <Poster hidden={videoReady} />
      {currentVideo && (
        <Video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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


