// This file was created to keep all types organised in the same place. I understand that in bigger projects,
// or in real life scenarios, different companies follow different practices.

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
}

export interface LoadingProps {
  text: string;
}
