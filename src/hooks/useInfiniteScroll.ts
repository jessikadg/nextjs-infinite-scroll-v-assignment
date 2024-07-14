import { useEffect, useState } from "react";
import getImagesList from "@/api/getImagesList";
import { PexelResponse, Photo } from "@/types/types";

const useInfiniteScroll = (elementRef: React.RefObject<any>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1); // Declare and initialize the 'page' state variable
  const [displayedImages, setDisplayedImages] = useState<Photo[] | undefined>(
    undefined
  );

  //fetch first page:
  useEffect(() => {
    const fetchInitialImages = async () => {
      await getImagesList(1).then((res) => {
        setDisplayedImages(res.photos);
        setLoading(false);
      });
    };

    fetchInitialImages();
  }, []);

  // fetch more images when the user scrolls to refered element:
  const onView = async (entries: IntersectionObserverEntry[]) => {
    const firstRefEntry = entries[0];

    if (firstRefEntry.isIntersecting && displayedImages) {
      await getImagesList(Number(page + 1)).then((res) =>
        setDisplayedImages([...displayedImages, ...res.photos])
      );
      setPage((prevPage) => prevPage + 1);
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
  }, [displayedImages, page]);

  return { displayedImages, loading };
};

export default useInfiniteScroll;
