import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/CreateMoviePage.module.css"; // Import CSS module for styling
import { MovieFormValues } from "@/types";
import { uploadPoster } from "../utils/api"; // Import the upload function
import { useRouter } from "next/navigation";

interface MovieFormProps {
  initialMovie: {
    title: string;
    publishingYear: number;
    poster: string | undefined;
  };
  onSubmit: (formData: MovieFormValues) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ initialMovie, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialMovie);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleCancel = () => {
    router.push("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("formValues", formValues);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const url = await uploadPoster(e.target.files[0]);
        console.log(formValues, url, { ...formValues, poster: url });
        // setFormValues({ ...formValues, poster: url });
        // console.log(formValues);
      } catch (error) {
        console.error("Failed to upload image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContent}>
        <div className={styles.imageUpload}>
          <label htmlFor="poster" className={styles.customFileUpload}>
            {uploading ? "Uploading..." : "Upload Image"}
          </label>
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
        <div className={styles.inputsAndButtons}>
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
          </div>
          <div className={styles.inputGroup}>
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
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
