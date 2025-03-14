import express from "express";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.routes";
import feedRoutes from "./routes/feed.routes";
import { authorizer } from "./middlewares/authorizer.middleware";
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use('/posts', authorizer, postsRoutes);
app.use('/feed', authorizer, feedRoutes);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});