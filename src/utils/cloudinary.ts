
/**
 * Utility to generate Cloudinary URLs.
 * @param publicId - the asset's path/filename in Cloudinary Media Library
 * @param options - Cloudinary transformation options (optional)
 */
const CLOUD_NAME = "your_cloud_name"; // <-- Replace with your Cloudinary cloud name

type TransformParams = {
  width?: number;
  height?: number;
  quality?: number | "auto";
  format?: "jpg" | "png" | "webp" | "auto";
};

export function getCloudinaryUrl(
  publicId: string,
  options: TransformParams = {}
): string {
  let transforms: string[] = [];

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  if (options.format) transforms.push(`f_${options.format}`);

  const transformStr = transforms.length ? transforms.join(",") + "/" : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}${publicId}`;
}
