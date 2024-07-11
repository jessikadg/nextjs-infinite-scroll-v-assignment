"use client";

import { ImageCardProps, PexelResponse, Photo } from "@/types/types";
import styles from "../app/page.module.css";
import { useEffect, useRef, useState } from "react";
import getImagesList from "@/api/getImagesList";
import { ImagesContainer } from "./styled/AtomicComponents";
import ImageCard from "@/components/ImageCard";
import dynamic from "next/dynamic";

const DynamicImageCard = dynamic<ImageCardProps>(
  () => import("@/components/ImageCard"),
  {
    ssr: false,
  }
);

const HomeLayout: React.FC<{ imagesList?: PexelResponse }> = ({
  imagesList,
}) => {
  const [displayedImages, setDisplayedImages] = useState<Photo[]>(
    imagesList?.photos || []
  );
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [favouriteImages, setFavouriteImages] = useState<number[] | null>(null);

  // Retrives favouriteImages from local storage on first render and saves it on state as number[]
  useEffect(() => {
    const favouriteImagesFromStorage =
      window.localStorage.getItem("FAVOURITE_IMAGES");

    if (favouriteImagesFromStorage !== null) {
      const parsedFavouriteImages = JSON.parse(
        favouriteImagesFromStorage
      ) as number[];

      setFavouriteImages(parsedFavouriteImages);
    } else {
      setFavouriteImages([]);
    }
  }, []);

  const elementRef = useRef(null);

  const onView = async (entries: any) => {
    //TO DO: improve this naming
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMoreImages) {
      await getImagesList(Number(page + 1)).then((res) =>
        setDisplayedImages([...displayedImages, ...res.photos])
      );
      setPage((page) => page + 1);
      return;
    }
  };

  // Handling the infinite scroll feature:
  useEffect(() => {
    const observer = new IntersectionObserver(onView);

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [imagesList, page]);

  // Saves favouriteImages on local storage
  useEffect(() => {
    if (favouriteImages !== null) {
      window.localStorage.setItem(
        "FAVOURITE_IMAGES",
        JSON.stringify(favouriteImages)
      );
    }
  }, [favouriteImages]);

  const handleFavouriteImage = (clickedImageId: number) => {
    if (favouriteImages !== null) {
      const isImageFavourite = favouriteImages.includes(clickedImageId);

      if (isImageFavourite) {
        // image is already favourite, so remove clickedImageId from array:
        setFavouriteImages(
          favouriteImages.filter(
            (favouriteImage) => favouriteImage !== clickedImageId
          )
        );
      } else {
        // image is a new favourte, so add append it to the array:
        setFavouriteImages([...favouriteImages, clickedImageId]);
      }
    }
  };

  return (
    // to do: remove initial css
    <main className={styles.main}>
      <h1>Infinite Scroll</h1>

      <ImagesContainer>
        {displayedImages.map((image: Photo) => (
          <DynamicImageCard
            key={image.id}
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
  );
};

export default HomeLayout;
