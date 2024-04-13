import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DbURI = process.env.MONGODB_URI || "";
const PORT = process.env.PORT || 4000;

console.log("DbURI", DbURI);

mongoose
  .connect(DbURI)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
