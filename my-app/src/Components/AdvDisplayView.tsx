import { AdvertisementData } from "../features/AdvertFormInputs";
import { auth } from "../firebase";
import { CustomUser } from "../features/DisplayedUserData";
import React from "react";
import "../Styles/Adv.css";

interface AdvDisplayViewProps {
  ads: AdvertisementData;
  answer: string;
  display: CustomUser;
  editing: boolean;
  uploadedImage: File | null;
  handleAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCancelChanges: () => void;
  handleConfirmChanges: (
    title: string,
    image: File | null,
    description: string,
    budget: number,
    date: string
  ) => Promise<void>;
  handleDeleteAdvert: () => Promise<void>;
  handleEditButtonClick: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

const AdvDisplayView: React.FC<AdvDisplayViewProps> = ({
  ads,
  answer,
  display,
  editing,
  uploadedImage,
  handleAnswerChange,
  handleCancelChanges,
  handleConfirmChanges,
  handleEditButtonClick,
  handleSubmit,

  handleImageChange,
  handleDeleteAdvert,
}) => {
  const loggedInUser = auth.currentUser;

  return (
    <div className="adv-container">
      {!editing && (
        <>
          <span className="user user-bottom-space">
            Created by: {ads.createdBy}
          </span>
          {ads.images.map((imageUrl, index) => (
            <img
              src={imageUrl}
              className="adv-img"
              alt="Advertisement"
              key={index}
            />
          ))}
          <h3 className="user">{ads.title}</h3>
          <p className="user">{ads.description}</p>
          <p className="user">Budget: {ads.budget}$</p>
          <p className="user">Date: {ads.date}</p>
        </>
      )}

      {!editing &&
      (display.userType === "Consultant" ||
        display.userType === "Consultant and Person who needs help") ? (
        <div className="adv-container-second">
          <textarea
            className="input-display"
            placeholder="If you are interested, write here!"
            value={answer}
            onChange={handleAnswerChange}
            required
          />
          <button className="go-back-second" onClick={handleSubmit}>
            Send message
          </button>
        </div>
      ) : null}

      {loggedInUser?.email === ads.createdBy && !editing && (
        <button className="edit-button" onClick={handleEditButtonClick}>
          Edit
        </button>
      )}

      {editing && loggedInUser?.email === ads.createdBy && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            handleConfirmChanges(
              (form.elements.namedItem("title") as HTMLInputElement).value,
              uploadedImage,
              (form.elements.namedItem("description") as HTMLTextAreaElement)
                .value,
              parseFloat(
                (form.elements.namedItem("budget") as HTMLInputElement).value
              ),
              (form.elements.namedItem("date") as HTMLInputElement).value
            );
          }}
        >
          <div className="center-edit-stuff">
            <label>
              <input type="text" name="title" defaultValue={ads.title} />
            </label>
            <label className="image-color">
              <input
                className="image-color"
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              Change image
            </label>
            <label>
              <textarea
                name="description"
                defaultValue={ads.description}
              ></textarea>
            </label>
            <label>
              <input
                type="number"
                name="budget"
                defaultValue={ads.budget}
                step="0.01"
              />
            </label>
            <label>
              <input type="date" name="date" defaultValue={ads.date} />
            </label>
          </div>
          <div className="col-btns">
            <button className="active-btn" type="submit">
              Confirm changes
            </button>
            <button
              className="active-btn"
              type="button"
              onClick={handleCancelChanges}
            >
              Cancel changes
            </button>
            <button
              className="active-btn"
              type="button"
              onClick={handleDeleteAdvert}
            >
              Delete advert
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdvDisplayView;
