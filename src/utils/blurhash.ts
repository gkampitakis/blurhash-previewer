import { isBlurhashValid } from 'blurhash';

const loadImage = async (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.crossOrigin = "Anonymous";
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image: CanvasImageSource) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width as number;
  canvas.height = image.height as number;
  const context = canvas.getContext("2d");
  context!.drawImage(image, 0, 0);
  return context!.getImageData(0, 0, image.width as number, image.height as number);
};

export const encodeImageToBlurhash = async (imageUrl: string): Promise<[Uint8ClampedArray, number, number]> => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return [imageData.data, imageData.width, imageData.height];
};

export { isBlurhashValid }; 
