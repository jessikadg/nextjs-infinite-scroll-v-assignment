"use client";

import { PhotoSrc } from "@/types/types";
import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";

interface ImageCardProps {
  src: PhotoSrc;
  alt: string;
  width: number;
  height: number;
  id: number;
  handleFavouriteImage: (id: number) => void;
  favouriteImages: number[] | null;
}

export const Card = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

export const HoverOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const PhotoName = styled.p`
  font-size: x-large;
  color: white;
  font-weight: bolder;
  margin-bottom: 6px;
`;

export const ArtistName = styled.p`
  font-style: italic;
  font-size: large;
  margin-top: 6px;
`;

export const HoverTextDivider = styled.hr`
  width: 86px;
  text-align: center;
  margin: 0 auto;
  height: 2px;
  background-color: white;
  border: none;
`;

export const FavouriteButton = styled.button`
  border: 1px solid white;
  border-radius: 24px;
  color: white;
  padding: 6px 14px;
  background-color: transparent;
  text-align: center;
  font-size: medium;
  position: absolute;
  bottom: 20px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  transform: translateX(-50%);
`;

export default function ImageCard({
  src,
  alt,
  id,
  handleFavouriteImage,
  favouriteImages,
}: ImageCardProps) {
  const isImageFavourite =
    favouriteImages !== null && favouriteImages.includes(id);

  return (
    <Card style={{ width: "300px", height: "200px" }}>
      {/* TO DO: apply image optimization */}
      <Image
        priority={true}
        src={src.large}
        alt={alt}
        width={300}
        height={200}
        style={{ objectFit: "cover" }}
      />
      <HoverOverlay>
        <PhotoName>Photo Name</PhotoName>
        <HoverTextDivider />
        <ArtistName> Artist Name</ArtistName>
        <FavouriteButton onClick={() => handleFavouriteImage(id)}>
          {isImageFavourite ? "Unfavourite" : "Favourite"}
        </FavouriteButton>
      </HoverOverlay>
    </Card>
  );
}
