import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { isHeroReady } from '@/lib/heroReady';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1B3A4B;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${props => props.isHiding ? fadeOut : fadeIn} 0.3s ease;
  pointer-events: ${props => props.isHiding ? 'none' : 'auto'};
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AnimatedLogo = styled.div`
  animation: ${pulse} 2s ease-in-out infinite;
  position: relative;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  margin-top: 20px;
`;

const LoadingText = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const router = useRouter();
  const landingPath = useRef(router.pathname);

  useEffect(() => {
    const landingHome = landingPath.current === '/';
    const hasLoadedBefore = sessionStorage.getItem('pageLoaded');

    // На вътрешните страници екранът се показва само при първо отваряне на таба.
    // Началната страница винаги чака поздравителното видео, включително при refresh.
    if (!landingHome && hasLoadedBefore) {
      setLoading(false);
      return;
    }

    const minDisplayTime = 500;
    const maxDisplayTime = landingHome ? 8000 : 1500;
    const startTime = Date.now();
    let timer;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      setIsHiding(true);
      timer = setTimeout(() => {
        setLoading(false);
        setIsHiding(false);
        sessionStorage.setItem('pageLoaded', 'true');
      }, 200);
    };

    const tryHide = () => {
      clearTimeout(timer);
      const elapsed = Date.now() - startTime;
      const ready = landingHome ? isHeroReady() : document.readyState === 'complete';

      if (elapsed >= maxDisplayTime || (ready && elapsed >= minDisplayTime)) {
        finish();
        return;
      }

      const wait = ready ? Math.max(0, minDisplayTime - elapsed) : 50;
      timer = setTimeout(tryHide, wait);
    };

    const onHeroReady = () => tryHide();
    window.addEventListener('hero-media-ready', onHeroReady);
    tryHide();

    return () => {
      window.removeEventListener('hero-media-ready', onHeroReady);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <LoadingOverlay isHiding={isHiding}>
      <LogoContainer>
        <AnimatedLogo>
          <Image
            src="/logo.png"
            alt="Loading"
            width={200}
            height={200}
            priority
            style={{
              objectFit: 'contain',
            }}
          />
        </AnimatedLogo>
        <LoadingText>Making connections</LoadingText>
        <Spinner />
      </LogoContainer>
    </LoadingOverlay>
  );
}

