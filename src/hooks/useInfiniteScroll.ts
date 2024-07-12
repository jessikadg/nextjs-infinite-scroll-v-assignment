import { useEffect, useState } from "react";
import getImagesList from "@/api/getImagesList";
import { PexelResponse, Photo } from "@/types/types";

const useInfiniteScroll = (
  imagesList: PexelResponse | undefined,
  elementRef: React.RefObject<any>
) => {
  const [page, setPage] = useState(1); // Declare and initialize the 'page' state variable
  const [displayedImages, setDisplayedImages] = useState<Photo[]>(
    imagesList?.photos || []
  );

  const onView = async (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting) {
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

  return { displayedImages };
};

export default useInfiniteScroll;
