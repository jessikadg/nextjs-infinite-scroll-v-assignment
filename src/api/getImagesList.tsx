import { PexelResponse } from "@/types/types";

const getImagesList = async (page: number): Promise<PexelResponse> => {
  try {
    console.log("next page fetched!");
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=15`,
      {
        headers: {
          Authorization:
            // TO DO: Put this string on env local
            "L979JiRTkHzmfrBQkqzMUQG98K2l9ek8M0e7KWvwX65qK0WnRGZXdx9J",
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
