import { useEffect, useState } from "react";
import getImagesList from "@/api/getImagesList";
import { Photo } from "@/types/types";
import { ApiError } from "next/dist/server/api-utils";

// Potential Improvements: add a 'hasMoreData' state to stop the infinite scroll when there is no more data to fetch.

const useInfiniteScroll = (elementRef: React.RefObject<HTMLElement>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [displayedImages, setDisplayedImages] = useState<Photo[] | undefined>(
    undefined
  );

  //fetch first page:
  useEffect(() => {
    const fetchInitialImages = async () => {
      try {
        const response = await getImagesList(1);
        setDisplayedImages(response.photos);
      } catch (error: unknown | any) {
        setLoadingError((error as ApiError).message);
      }

      setLoading(false);
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

  return { displayedImages, loading, loadingError };
};

export default useInfiniteScroll;
