import { AdvertisementData } from "../features/AdvertFormInputs";
import AdvDisplayView from "./AdvDisplayView";
import { auth } from "../firebase";
import { CustomUser } from "../features/DisplayedUserData";
import { deleteAdFromFirebase } from "../features/deleteAdFromFirebase";
import "../Styles/Adv.css";
import { Message } from "../features/storeTypes";
import { updateRefreshKey } from "../features/refreshSlice";
import { sendMessage } from "../features/Message";
import { saveMessageToFirebase } from "../features/saveMessageToFirebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAdInFirebase } from "../features/updateAdInFirebase";
import { uploadImageToStorage } from "../features/uploadImageToStorage";

interface AdvertisementDisplayProps {
  ads: AdvertisementData;
  display: CustomUser;
}

const AdvDisplay: React.FC<AdvertisementDisplayProps> = ({ ads, display }) => {
  const [answer, setAnswer] = useState("");
  const [editing, setEditing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const dispatch = useDispatch();

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleCancelChanges = () => {
    setEditing(false);
  };

  const handleConfirmChanges = async (
    title: string,
    image: File | null,
    description: string,
    budget: number,
    date: string
  ) => {
    if (editing) {
      let updatedImages = ads.images;
      if (image) {
        const uploadedImageUrl = await uploadImageToStorage(image, ads.id);
        updatedImages = [uploadedImageUrl];
      }

      const updatedAd: AdvertisementData = {
        ...ads,
        title,
        images: updatedImages,
        description,
        budget,
        date,
      };
      await updateAdInFirebase(updatedAd);
      setEditing(false);
    }
  };

  const handleDeleteAdvert = async () => {
    await deleteAdFromFirebase(ads.id);
    dispatch(updateRefreshKey());
  };

  const handleEditButtonClick = () => {
    setEditing(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const createdAt = new Date();
    const createdAtISOString = createdAt.toISOString();
    const messageData = {
      message: answer,
      email: display.email,
      sender: auth.currentUser?.email || "",
      receiver: ads.createdBy,
      adId: ads.id,
      adTitle: ads.title,
      createdAt: createdAtISOString,
    };
    await saveMessageToFirebase(messageData);
    dispatch(sendMessage([messageData as Message]));
    setAnswer("");
  };

  return (
    <AdvDisplayView
      ads={ads}
      answer={answer}
      display={display}
      editing={editing}
      uploadedImage={uploadedImage}
      handleAnswerChange={handleAnswerChange}
      handleCancelChanges={handleCancelChanges}
      handleConfirmChanges={handleConfirmChanges}
      handleDeleteAdvert={handleDeleteAdvert}
      handleEditButtonClick={handleEditButtonClick}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AdvDisplay;
