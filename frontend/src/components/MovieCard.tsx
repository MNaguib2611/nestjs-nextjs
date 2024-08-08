import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/MovieCard.module.css";
import { Movie } from "../types";

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={movie.poster || "/placeholder.png"}
          alt={movie.title}
          width={282}
          height={600}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className={styles.details}>
        <span>
          {movie.title} <span>({movie.publishingYear})</span>
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
