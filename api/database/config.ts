import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import mongoose from "mongoose";

if (process.env.DB_URI) {
  mongoose.connect(process.env.DB_URI).then((res) => {
    res.connection.on("success", () => {
      console.log("Connected to database");
    });

    res.connection.on("error", (err) => {
      console.log("Error connecting to database");
      console.log(err);
    });
  });
} else {
  console.log("No database URI provided");
  process.exit(1);
}
