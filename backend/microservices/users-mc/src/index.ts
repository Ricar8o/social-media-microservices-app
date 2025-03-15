import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";
import userRoutes from "./routes/user.routes";
import { authorizer } from "./middlewares/authorizer.middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', authorizer, usersRoutes);
app.use('/user', authorizer, userRoutes);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});