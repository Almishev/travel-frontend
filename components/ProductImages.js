import styled from "styled-components";
import {useEffect, useState} from "react";
import Image from "next/image";
import BookPlaceholderIcon from "@/components/BookPlaceholderIcon";

// Image components са заменени с Next.js Image за lazy loading
const ImageButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${props => props.active ? `
    border-color: #ccc;
  ` : `
    border-color: transparent;
  `}
  width: 40px;
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
  flex: 0 0 40px;
`;
const BigImageWrapper = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: center;
  cursor: zoom-in;
`;
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 16px 24px;
`;
const FullImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
`;
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$side === "left" ? "left: 16px;" : "right: 16px;")}
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
`;
const PlaceholderWrapper = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InnerPlaceholder = styled.div`
  width: 90%;
  height: 90%;
  border: 1px dashed #d4d4d8;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
`;

export default function ProductImages({images = []}) {
  const hasImages = images.length > 0;
  const [activeImage,setActiveImage] = useState(hasImages ? images[0] : null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setActiveImage(hasImages ? images[0] : null);
    setFullscreen(false);
  }, [hasImages, images]);

  useEffect(() => {
    if (!fullscreen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setFullscreen(false);
      if (event.key === "ArrowRight") stepImage(1);
      if (event.key === "ArrowLeft") stepImage(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, images]);

  function stepImage(direction) {
    setActiveImage((current) => {
      const index = images.indexOf(current);
      const nextIndex = (index + direction + images.length) % images.length;
      return images[nextIndex];
    });
  }

  if (!hasImages) {
    return (
      <PlaceholderWrapper>
        <InnerPlaceholder>
          <BookPlaceholderIcon size={64} />
        </InnerPlaceholder>
      </PlaceholderWrapper>
    );
  }

  return (
    <>
      <BigImageWrapper type="button" onClick={() => setFullscreen(true)} aria-label="Отвори снимката на цял екран">
        <Image 
          src={activeImage} 
          alt=""
          width={400}
          height={200}
          style={{
            maxWidth: '100%',
            maxHeight: '200px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
          }}
          loading="lazy"
          unoptimized={activeImage?.includes('s3.amazonaws.com')}
        />
      </BigImageWrapper>
      {fullscreen && (
        <Overlay onClick={() => setFullscreen(false)}>
          <CloseButton type="button" aria-label="Затвори" onClick={() => setFullscreen(false)}>×</CloseButton>
          {images.length > 1 && (
            <ArrowButton
              type="button"
              $side="left"
              aria-label="Предишна снимка"
              onClick={(event) => {
                event.stopPropagation();
                stepImage(-1);
              }}
            >
              ‹
            </ArrowButton>
          )}
          <FullImage
            src={activeImage}
            alt=""
            onClick={(event) => event.stopPropagation()}
          />
          {images.length > 1 && (
            <ArrowButton
              type="button"
              $side="right"
              aria-label="Следваща снимка"
              onClick={(event) => {
                event.stopPropagation();
                stepImage(1);
              }}
            >
              ›
            </ArrowButton>
          )}
        </Overlay>
      )}
      <ImageButtons>
        {images.map(image => (
          <ImageButton
            key={image}
            active={image===activeImage}
            onClick={() => setActiveImage(image)}>
            <Image 
              src={image} 
              alt=""
              width={40}
              height={40}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading="lazy"
              unoptimized={image?.includes('s3.amazonaws.com')}
            />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}