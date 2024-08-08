"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api, { fetchMovies } from "@/utils/api";
import styles from "../../styles/Movies.module.css";
import Layout from "../../components/Layout";
import { Movie } from "@/types";
import MovieCard from "@/components/MovieCard";

const MoviesPage = () => {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      loadMovies(page);
    }
  }, [page, router]);

  const loadMovies = async (page: number) => {
    try {
      const response = await fetchMovies(page, limit);
      setMovies(response.data.movies);
      setTotal(response.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const goToCreatePage = () => {
    router.push("/movies/create");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Layout>
      <div className={styles.container}>
        {movies.length === 0 ? (
          <div className={styles.emptyState}>
            <h1 className={styles.title}>Your movie list is empty</h1>
            <button className={styles.button} onClick={goToCreatePage}>
              Add a new movie
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>
                My Movies
                <Image
                  src="/icons/plus.png"
                  alt="Add Movie"
                  width={24}
                  height={24}
                  onClick={goToCreatePage}
                  className={styles.icon}
                />
              </h1>
              <span className={styles.logout} onClick={handleLogout}>
                Log out
                <Image
                  src="/icons/logout.png"
                  alt="Logout"
                  width={24}
                  height={24}
                  className={styles.icon}
                />
              </span>
            </div>
            <div className={styles.movieGrid}>
              {movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <div className={styles.pagination}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={styles.pageButton}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={styles.pageButton}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className={styles.pageButton}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MoviesPage;
