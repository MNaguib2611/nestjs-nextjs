"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import MovieForm from "../../components/MovieForm";
import { MovieFormValues } from "../../types";
import { createMovie } from "../../utils/api";
import styles from "../../styles/CreateMoviePage.module.css";

const CreateMoviePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const handleFormSubmit = async (formData: MovieFormValues) => {
    try {
      await createMovie(formData);
      router.push("/movies");
    } catch (error) {
      console.error("Failed to create movie:", error);
    }
  };

  const initialMovie: MovieFormValues = {
    title: "",
    publishingYear: new Date().getFullYear(),
    poster: "",
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Create a New Movie</h1>
        <MovieForm initialMovie={initialMovie} onSubmit={handleFormSubmit} />
      </div>
    </Layout>
  );
};

export default CreateMoviePage;
