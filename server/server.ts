import express from "express";
const app = express();
import cors from "cors";
import cartRoutes from "./routes/cart.ts";
import { SERVER } from "./config/db.ts";

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(SERVER.SERVER_PORT, () => {
  console.log(`The Server is running use ^c to chill server`);
  console.log(
    `Server started on ${SERVER.SERVER_HOSTNAME}:${SERVER.SERVER_PORT}`,
  );
});

app.use("/", cartRoutes);
