export interface PexelResponse {
  next_page: string;
  page: number;
  per_page: number;
  total_results: number;
  photos: Photo[];
}

export interface Photo {
  alt: string;
  avg_color: string;
  id: number;
  liked: boolean;
  height: number;
  photographer: string;
  photographer_id: number;
  protographer_url: string;
  url: string;
  width: number;
  src: PhotoSrc;
}

export interface PhotoSrc {
  landscape: string;
  large: string;
  large2x: string;
  medium: string;
  original: string;
  small: string;
  tiny: string;
}

export interface ImageCardProps {
  src: PhotoSrc;
  alt: string;
  width: number;
  height: number;
  id: number;
  photographer: string;
  handleFavouriteImage: (id: number) => void;
  favouriteImages: number[] | null;
}

export interface LoadingProps {
  text: string;
}
