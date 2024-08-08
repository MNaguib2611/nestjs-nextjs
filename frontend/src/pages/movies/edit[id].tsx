// src/app/pages/create.tsx or edit/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import MovieForm from "../../components/MovieForm";
import { createMovie, updateMovie } from "../../utils/api";
import Layout from "../../components/Layout";

const MovieCreateOrUpdate: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleFormSubmit = async (formData: any) => {
    if (id) {
      await updateMovie(Number(id), formData);
    } else {
      await createMovie(formData);
    }
    router.push("/");
  };

  return (
    <Layout>
      <MovieForm
        initialMovie={{ title: "", year: new Date().getFullYear() }}
        onSubmit={handleFormSubmit}
      />
    </Layout>
  );
};

export default MovieCreateOrUpdate;
