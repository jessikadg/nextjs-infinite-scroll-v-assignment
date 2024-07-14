import { ImageLoaderProps } from "next/image";
import { TrimUrl } from "./trimUrl";

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // Since the API returns a src object where the widths and heights are defined on the URLs,
  // that prevents Next.js server from optimising the images, and noticably hindering performance.
  // To solve this, I'm using this reusable function, and passing it to the Image component loader prop.
  const imageURL = `${TrimUrl(src)}?w=${width}&q=${quality || 75}`;
  return imageURL;
};
