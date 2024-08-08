import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/MovieCard.module.css";
import { Movie } from "../types";

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/movies/edit/${movie.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
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
