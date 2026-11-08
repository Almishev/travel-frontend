import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { isHeroReady } from '@/lib/heroReady';

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
  z-index: 11000;
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

function videoIsPlaying() {
  const video = document.querySelector("video");
  if (!video) return false;
  return video.readyState >= 3 || video.currentTime > 0;
}

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const landingPath = useRef(router.pathname);

  useEffect(() => {
    const landingHome = landingPath.current === "/";
    let seenBefore = false;
    try {
      seenBefore = sessionStorage.getItem("pageLoaded") === "true";
    } catch (err) {
      seenBefore = false;
    }

    if (!landingHome && seenBefore) {
      setLoading(false);
      return undefined;
    }

    if (!window.__heroLoaderStarted) {
      window.__heroLoaderStarted = Date.now();
    }
    const startedAt = window.__heroLoaderStarted;
    let stopped = false;

    const hide = () => {
      if (stopped) return;
      stopped = true;
      setLoading(false);
      try {
        sessionStorage.setItem("pageLoaded", "true");
      } catch (err) {
        // Ако браузърът блокира хранилището, екранът пак трябва да се махне.
      }
    };

    const tick = () => {
      if (stopped) return;
      const elapsed = Date.now() - startedAt;
      if (!landingHome) {
        if (document.readyState === "complete" || elapsed >= 1500) {
          hide();
          return;
        }
      } else if (isHeroReady() || videoIsPlaying() || elapsed >= 8000) {
        hide();
        return;
      }
      window.requestAnimationFrame(tick);
    };

    tick();
    return () => {
      stopped = true;
    };
  }, []);

  if (!loading) return null;

  return (
    <LoadingOverlay>
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

