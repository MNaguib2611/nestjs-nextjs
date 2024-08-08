import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/CreateMoviePage.module.css"; // Import CSS module for styling
import { MovieFormValues } from "@/types";

interface MovieFormProps {
  initialMovie: {
    title: string;
    publishingYear: number;
    poster: string;
  };
  onSubmit: (formData: MovieFormValues) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ initialMovie, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialMovie);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormValues({
        ...formValues,
        poster: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.gridContainer}>
        <div className={styles.imageUpload}>
          <label htmlFor="poster">Drop an image here</label>
          <input
            type="file"
            id="poster"
            name="poster"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.imageInput}
          />
          <div className={styles.imagePreview}>
            {formValues.poster ? (
              <Image
                src={formValues.poster}
                alt="Poster Preview"
                className={styles.previewImage}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <p>Drop an image here</p>
            )}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <input
            className={styles.input}
            type="number"
            id="publishingYear"
            name="publishingYear"
            value={formValues.publishingYear}
            onChange={handleInputChange}
            placeholder="Publishing year"
          />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
