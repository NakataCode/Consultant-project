import React from "react";

interface AdvertisementViewProps {
  title: string;
  description: string;
  budget: string;
  date: string;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleBudgetChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  navigateBack: () => void;
}

const AdvertisementView: React.FC<AdvertisementViewProps> = ({
  title,
  description,
  budget,
  date,
  handleTitleChange,
  handleDescriptionChange,
  handleBudgetChange,
  handleDateChange,
  handleImageChange,
  handleSubmit,
  navigateBack,
}) => {
  return (
    <div>
      <button className="go-back" onClick={navigateBack}>
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

export default AdvertisementView;
