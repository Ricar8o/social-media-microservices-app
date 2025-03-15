import express from "express";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.routes";
import { authorizer } from "./middlewares/authorizer.middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/posts', authorizer, postsRoutes);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});