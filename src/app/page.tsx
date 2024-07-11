import getImagesList from "@/api/getImagesList";

import HomeLayout from "@/components/HomeLayout";
import { PexelResponse } from "@/types/types";

export default async function Home() {
  const imagesList: PexelResponse = await getImagesList(1);

  return <HomeLayout imagesList={imagesList} />;
}
