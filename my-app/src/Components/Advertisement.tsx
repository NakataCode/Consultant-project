import React, { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL } from "firebase/storage";
import "../Styles/Adv.css";

const CreateAd: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setImages(Array.from(fileList));
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      images.length === 0 ||
      date.trim() === "" ||
      budget.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const storage = getStorage();
    const firestore = getFirestore();

    const imageUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      imageUrls.push(imageUrl);
    }

    const adData = {
      title,
      description,
      images: imageUrls,
      date,
      budget,
    };

    await addDoc(collection(firestore, "ads"), adData);

    setTitle("");
    setDescription("");
    setImages([]);
    setDate("");
    setBudget("");
  };

  return (
    <div>
      <button className="go-back" onClick={() => navigate("/user")}>
        Go back
      </button>
      <div className="ad-form-container">
        <h2>Create Advertisement:</h2>
        <form className="ad-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Title:</label>
            <input type="text" value={title} onChange={handleTitleChange} />
          </div>
          <div className="form-field">
            <label>Description:</label>
            <textarea value={description} onChange={handleDescriptionChange} />
          </div>
          <div className="form-field">
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <div className="form-field">
            <label>Date:</label>
            <input type="date" value={date} onChange={handleDateChange} />
          </div>
          <div className="form-field">
            <label>Budget:</label>
            <input type="number" value={budget} onChange={handleBudgetChange} />
          </div>
          <button onClick={handleSubmit} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAd;
