// src/app/utils/api.ts
import axios from "axios";
import { redirect } from "next/navigation";

const baseURL = "http://localhost:9000";
const api = axios.create({ baseURL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      redirect("/");
    }
    return Promise.reject(error);
  }
);

export const fetchMovies = async (page: number = 1, limit: number = 8) => {
  return api.get(`/movies?page=${page}&limit=${limit}`);
};

export const fetchMovie = async (id: number) => {
  return api.get(`/movies/${id}`);
};

export const createMovie = async (movieData: any) => {
  return api.post("/movies", movieData);
};

export const updateMovie = async (id: number, movieData: any) => {
  return api.put(`/movies/${id}`, movieData);
};

export const deleteMovie = async (id: number) => {
  return api.delete(`/movies/${id}`);
};

export default api;
