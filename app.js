import express from "express";
import cors from "cors";
import "dotenv/config";
import postRouter from "./routes/postRoute.js";
import job from "./utils/cron.js";

const app = express();
const PORT = process.env.PORT || 3600;

// Middlewares
app.use(cors());
app.use(express.json());

// Cron Job
if (process.env.NODE_ENV === "production") {
  job.start();
}

// Routes
app.use(postRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
