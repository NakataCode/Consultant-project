import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const db = getFirestore();

export const deleteAdFromFirebase = async (id: string) => {
  await deleteDoc(doc(db, "ads", id));
};
