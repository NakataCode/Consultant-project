import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";

export const uploadImageToStorage = async (
  image: File,
  adId: string
): Promise<string> => {
  const imageRef = ref(storage, `ads/${adId}/${image.name}`);
  await uploadBytes(imageRef, image);
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};
