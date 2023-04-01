import { AdvertisementData } from "./AdvertFormInputs";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const firestore = getFirestore();

export const updateAdInFirebase = async (updatedAd: AdvertisementData) => {
  const adDocRef = doc(firestore, "ads", updatedAd.id);
  await updateDoc(adDocRef, {
    budget: updatedAd.budget,
    date: updatedAd.date,
    description: updatedAd.description,
    images: updatedAd.images,
    title: updatedAd.title,
  });
};
