import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  movies?: any[]; // Replace any with your Movie type
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    // Fetch all movies logic here
    res.status(200).json({ success: true, movies: [] });
  } else if (req.method === "POST") {
    // Create a new movie logic here
    res.status(201).json({ success: true, message: "New movie created" });
  }
}
