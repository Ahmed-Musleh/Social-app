import express from "express";

import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//Read
//make sure to use verifyToken on these routes after implementing the front end
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);
//Update
router.patch("/:id/like", likePost);

export default router;
