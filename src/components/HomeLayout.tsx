"use client";

import { ImageCardProps, PexelResponse, Photo } from "@/types/types";
import styles from "../app/page.module.css";
import { useRef } from "react";
import { ImagesContainer } from "./styled/AtomicComponents";
import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFavouriteImages from "@/hooks/useFavouriteImage";
import getImagesList from "@/api/getImagesList";
import Loading from "./Loading";

const DynamicImportCard = dynamic<ImageCardProps>(
  () => import("@/components/ImageCard"),
  {
    ssr: false,
  }
);

const HomeLayout: React.FC = () => {
  const elementRef = useRef<HTMLParagraphElement>(null);

  const { displayedImages, loading } = useInfiniteScroll(elementRef);

  const { favouriteImages, handleFavouriteImage } = useFavouriteImages();

  return (
    <>
      {/* // to do: remove initial css */}
      <main className={styles.main}>
        <h1>Infinite Scroll</h1>

        {loading || !displayedImages ? (
          <Loading text="Loading Images..." />
        ) : (
          <>
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
          </>
        )}
      </main>
    </>
  );
};

export default HomeLayout;
