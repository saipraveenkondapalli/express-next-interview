import { Request, Response } from "express";
import RequestWithUser from "../types/requestWithUser";

const createPost = async (req: Request, res: Response) => {};

const samplePosts = async (req: RequestWithUser, res: Response) => {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content: "This is the content of post 1",
    },
    {
      id: 2,
      title: "Post 2",
      content: "This is the content of post 2.",
    },
  ];

  return res.json(posts);
};

export { createPost, samplePosts };
