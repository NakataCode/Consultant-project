import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteMessageFromFirebase = async (messageId: string) => {
  const messageRef = doc(db, "messages", messageId);
  await deleteDoc(messageRef);
};
