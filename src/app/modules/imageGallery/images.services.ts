import { Image } from "./images.model";

const getAllImages = async () => {
  const result = await Image.find();
  return result;
};

export const imageService = {
  getAllImages,
};
