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

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
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
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
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

//routes
app.get("/api/users", (_, res) => res.json({ greeting: "Hello" }));
