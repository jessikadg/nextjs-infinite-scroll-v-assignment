import { ImageLoaderProps } from "next/image";
import { TrimUrl } from "./trimUrl";

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const imageURL = `${TrimUrl(src)}?w=${width}&q=${quality || 75}`;
  return imageURL;
};
