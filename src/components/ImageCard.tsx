import { ImageCardProps } from "@/types/types";
import Image from "next/image";

import {
  Card,
  HoverOverlay,
  HoverTextDivider,
  FavouriteButton,
  SubHeader,
  Header,
} from "./styled/AtomicComponents";
import { TrimUrl } from "@/utils/trimUrl";
import { imageLoader } from "@/utils/imageLoader";

export default function ImageCard({
  src,
  alt,
  id,
  handleFavouriteImage,
  favouriteImages,
  photographer,
}: ImageCardProps) {
  const isImageFavourite =
    favouriteImages !== null && favouriteImages.includes(id);

  return (
    <Card style={{ width: "300px", height: "200px" }}>
      <Image
        loader={imageLoader}
        priority={true}
        src={TrimUrl(src.large)}
        alt={alt}
        width={300}
        height={200}
        style={{ objectFit: "cover" }}
        quality={80}
      />
      <HoverOverlay>
        {/* Photos from Pexel didn't have a title from API, so I used the photographer's name and the alt attribute */}
        <Header>{photographer}</Header>
        <HoverTextDivider />
        <SubHeader>{alt}</SubHeader>
        <FavouriteButton onClick={() => handleFavouriteImage(id)}>
          {isImageFavourite ? "Unfavourite" : "Favourite"}
        </FavouriteButton>
      </HoverOverlay>
    </Card>
  );
}
