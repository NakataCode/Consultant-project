import { auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
import "../Styles/Adv.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const newAd = {
        title,
        description,
        budget,
        date,
        images: imageRefs,
        createdBy: auth.currentUser?.email,
      };

      await addDoc(adRef, newAd);

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

  return (
    <div>
      <button className="go-back" onClick={() => navigate("/user")}>
        Go back
      </button>
      <div className="ad-form-container">
        <h2>Create Advertisement:</h2>
        <form className="ad-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="title">Title:</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="form-field">
            <label className="description">Description:</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <div className="form-field">
            <label className="image">Image:</label>
            <input type="file" onChange={handleImageChange} required />
          </div>
          <div className="form-field">
            <label className="date">Date:</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="form-field">
            <label className="budget">Budget:</label>
            <input
              type="number"
              value={budget}
              onChange={handleBudgetChange}
              required
            />
          </div>
          <button className="adv-submit-btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Advertisement;
