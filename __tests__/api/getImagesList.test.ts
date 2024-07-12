import getImagesList from "../../src/api/getImagesList"; // Adjust the path as needed
import fetchMock from "jest-fetch-mock";

describe("getImagesList", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("should fetch images and return data given a correct API key", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        photos: [{ id: 1, src: { medium: "url" }, alt: "image1" }],
      })
    );

    const data = await getImagesList(1);
    expect(data.photos).toHaveLength(1);
    expect(data.photos[0].id).toBe(1);
    expect(data.photos[0].src.medium).toBe("url");
    expect(data.photos[0].alt).toBe("image1");
  });

  test("should handle fetch errors", async () => {
    fetchMock.mockRejectOnce(new Error("API is down"));

    await expect(getImagesList(1)).rejects.toThrow("Failed to fetch images");
  });
});
