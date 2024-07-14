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
import LoadingError from "./LoadingError";

// This dynamic import prevents Next.js from loading all cards and images at the server side,
// drastically improving performance and user experience.
const DynamicImportCard = dynamic<ImageCardProps>(
  () => import("@/components/ImageCard"),
  {
    ssr: false,
  }
);

const HomeLayout: React.FC = () => {
  const elementRef = useRef<HTMLParagraphElement>(null);

  const { displayedImages, loading, loadingError } =
    useInfiniteScroll(elementRef);

  const { favouriteImages, handleFavouriteImage } = useFavouriteImages();

  if (loadingError) {
    return <LoadingError errorMessage={loadingError} />;
  }

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
            {/* Improve this to a loading spinner or loading bar */}
            <p ref={elementRef}>Loading more...</p>
          </>
        )}
      </main>
    </>
  );
};

export default HomeLayout;
