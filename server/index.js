import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OtpRouter from "./routes/otp-route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/otp", OtpRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
