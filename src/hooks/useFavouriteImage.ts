import { useEffect, useState } from "react";

const useFavouriteImages = () => {
  const [favouriteImages, setFavouriteImages] = useState<number[] | null>(null);

  // On first render check if there are any favourite images in local storage and set the state accordingly:
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

  // Update local storage whenever favouriteImages state changes:
  useEffect(() => {
    if (favouriteImages !== null) {
      window.localStorage.setItem(
        "FAVOURITE_IMAGES",
        JSON.stringify(favouriteImages)
      );
    }
  }, [favouriteImages]);

  // Update the state based on the clicked image, which triggers the useEffect above:
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

  return { favouriteImages, handleFavouriteImage };
};

export default useFavouriteImages;
