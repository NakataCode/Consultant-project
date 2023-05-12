import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteMessageFromFirebase = async (messageId: string) => {
  const messageRef = doc(db, "messages", messageId);
  await deleteDoc(messageRef);
};
