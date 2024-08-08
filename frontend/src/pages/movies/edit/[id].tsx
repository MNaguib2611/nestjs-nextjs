"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "../../../components/Layout";
import MovieForm from "../../../components/MovieForm";
import { MovieFormValues } from "../../../types";
import { getMovieById, updateMovie } from "../../../utils/api"; // Assuming you have these API functions
import styles from "../../../styles/CreateMoviePage.module.css";

const EditMoviePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [initialMovie, setInitialMovie] = useState<MovieFormValues | null>(
    null
  );

  useEffect(() => {
    console.log(initialMovie);
  }, [initialMovie]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    // Fetch the existing movie data
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieById(+id);
        console.log("movieData", movieData);

        setInitialMovie({
          title: movieData.title,
          publishingYear: movieData.publishingYear,
          poster: movieData.poster || "",
        });
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };

    fetchMovie();
  }, [id, router]);

  const handleFormSubmit = async (formData: MovieFormValues) => {
    try {
      await updateMovie(+id, formData); // Update the movie using the id
      router.push("/movies");
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  if (!initialMovie) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Movie</h1>
        <MovieForm initialMovie={initialMovie} onSubmit={handleFormSubmit} />
      </div>
    </Layout>
  );
};

export default EditMoviePage;
