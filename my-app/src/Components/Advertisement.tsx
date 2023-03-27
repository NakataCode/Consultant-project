import { auth } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
import "../Styles/Adv.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvertisementView from "./AdvertisementView";

const Advertisement: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const imageRefs: string[] = [];
      for (const image of images) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        imageRefs.push(imageUrl);
      }

      const adRef = collection(db, "ads");
      const newAd: {
        title: string;
        description: string;
        budget: string;
        date: string;
        images: string[];
        createdBy: string | null | undefined;
        id?: string;
      } = {
        title,
        description,
        budget,
        date,
        images: imageRefs,
        createdBy: auth.currentUser?.email,
      };

      const adDoc = await addDoc(adRef, newAd);
      const adId = adDoc.id;

      newAd.id = adId;

      await setDoc(doc(db, "ads", adId), { id: adId }, { merge: true });
      navigate("/Home_Page");

      setTitle("");
      setDescription("");
      setBudget("");
      setDate("");
      setImages([]);
    } catch (err) {
      console.error(err);
    }
  };
  const navigateBack = () => {
    navigate("/user");
  };

  return (
    <AdvertisementView
      title={title}
      description={description}
      budget={budget}
      date={date}
      handleTitleChange={handleTitleChange}
      handleDescriptionChange={handleDescriptionChange}
      handleBudgetChange={handleBudgetChange}
      handleDateChange={handleDateChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      navigateBack={navigateBack}
    />
  );
};

export default Advertisement;
