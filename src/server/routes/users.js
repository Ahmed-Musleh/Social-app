import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";

import { verfiedToken } from "../middleware/auth.js";

const router = express.Router();

//Read
//after you implement the front end verified token insert it as a middelware in the following routes as such
// router.get("/:id", verfiedToken, getUser);
router.get("/:id", getUser);
router.get("/:id/firends", getUserFriends);
router.patch("./:id/:friendId", addRemoveFriend);

export default router;
