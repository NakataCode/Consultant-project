import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Message } from "./storeTypes";

export const saveMessageToFirebase = async (messageData: Message) => {
  try {
    const messageRef = collection(db, "messages");
    const docRef = await addDoc(messageRef, messageData);
  } catch (err) {
    console.log(err);
  }
};
