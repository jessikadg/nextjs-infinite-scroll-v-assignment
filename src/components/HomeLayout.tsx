"use client";

import { ImageCardProps, PexelResponse, Photo } from "@/types/types";
import styles from "../app/page.module.css";
import { useEffect, useRef, useState } from "react";
import { ImagesContainer } from "./styled/AtomicComponents";
import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFavouriteImages from "@/hooks/useFavouriteImage";

const DynamicImportCard = dynamic<ImageCardProps>(
  () => import("@/components/ImageCard"),
  {
    ssr: false,
  }
);

// Improvements: better "Loading" styles

const HomeLayout: React.FC<{ imagesList?: PexelResponse }> = ({
  imagesList,
}) => {
  const elementRef = useRef<HTMLParagraphElement>(null);

  const { displayedImages } = useInfiniteScroll(imagesList, elementRef);

  const { favouriteImages, handleFavouriteImage } = useFavouriteImages();

  return (
    <>
      {/* // to do: remove initial css */}
      <main className={styles.main}>
        <h1>Infinite Scroll</h1>

        <ImagesContainer>
          {displayedImages.map((image: Photo, index) => (
            <DynamicImportCard
              key={Number(`${index}${image.id}`)}
              id={image.id}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              photographer={image.photographer}
              favouriteImages={favouriteImages}
              handleFavouriteImage={(id) => handleFavouriteImage(id)}
            />
          ))}
        </ImagesContainer>
        {/* Improve this to a loading spinner */}
        <p ref={elementRef}>Loading more...</p>
      </main>
    </>
  );
};

export default HomeLayout;
