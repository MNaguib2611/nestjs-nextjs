"use client";

import Layout from "../components/Layout";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignIn from "../components/SignIn";
// import "./styles/globals.css";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/movies");
    }
  }, [router]);

  return (
    <Layout>
      <SignIn />
    </Layout>
  );
};

export default Home;
