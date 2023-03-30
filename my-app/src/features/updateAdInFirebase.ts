import { AdvertisementData } from "./AdvertFormInputs";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const firestore = getFirestore();

export const updateAdInFirebase = async (updatedAd: AdvertisementData) => {
  const adDocRef = doc(firestore, "ads", updatedAd.id);
  await updateDoc(adDocRef, {
    title: updatedAd.title,
    images: updatedAd.images,
    description: updatedAd.description,
    budget: updatedAd.budget,
    date: updatedAd.date,
  });
};
