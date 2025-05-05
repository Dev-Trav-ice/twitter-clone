import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const db = mongoose
  .connect(process.env.MONGO_URI)
  .then((host) => {
    console.log(`database connected. ${host.connection.host}`);
  })
  .catch((error) => console.log(`database not connected. \n ${error}`));
