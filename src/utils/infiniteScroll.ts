import { useEffect, useRef, useState } from "react";
import getImagesList from "@/api/getImagesList";
import { Photo, PexelResponse } from "@/types/types";

const useInfiniteScroll = (imagesList?: PexelResponse) => {
  const [displayedImages, setDisplayedImages] = useState<Photo[]>(
    imagesList?.photos || []
  );
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [favouriteImages, setFavouriteImages] = useState<number[] | null>(null);
  const elementRef = useRef(null);

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

  const onView = async (entries: any) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMoreImages) {
      await getImagesList(Number(page + 1)).then((res) =>
        setDisplayedImages([...displayedImages, ...res.photos])
      );
      setPage((page) => page + 1);
      return;
    }
  };

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

  useEffect(() => {
    if (favouriteImages !== null) {
      window.localStorage.setItem(
        "FAVOURITE_IMAGES",
        JSON.stringify(favouriteImages)
      );
    }
  }, [favouriteImages]);

  return {
    displayedImages,
    favouriteImages,
    handleFavouriteImage,
    elementRef,
  };
};

export default useInfiniteScroll;
