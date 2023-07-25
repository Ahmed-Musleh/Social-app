import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotoenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotoenv.config();

// init app express
export const app = express();

//middleware
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "same-origin" },
    contentSecurityPolicy: false,
  })
);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cp) => {
    cp(null, file.originalname);
  },
});

const upload = multer({ storage });

//mongoose setup
mongoose.connect(process.env.MONGO_URI);

// //data injection
// const testData = async () => {
//   try {
//     await User.insertMany(users);
//     await Post.insertMany(posts);
//     console.log("injected successfully");
//   } catch (error) {
//     console.error(
//       `something went wrong while injecting users and posts test data`
//     );
//   }
// };
// testData().then(() => console.log("inserted successfully"));
//routes
app.post("/posts", upload.single("picture"), createPost);
app.post("/auth/register", upload.single("picture"), register); //this has to go into routes
app.get("/api/users", (_, res) => res.json({ greeting: "Hello!" }));
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
