import { PexelResponse } from "@/types/types";

const getImagesList = async (page: number): Promise<PexelResponse> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=15`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
        },
        next: {
          // the 'curated' selection from Pexels received a new image every hour, so I'm caching results, and revalidating once per hour.
          revalidate: 3600,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images");
  }
};

export default getImagesList;
