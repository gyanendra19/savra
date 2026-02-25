import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import teacherRoute from "./routes/teacherRoute.js";
import activityRoute from "./routes/activityRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log("Error while connecting");
  }
})();
app.use("/activity", activityRoute);
app.use("/teacher", teacherRoute);
app.use("/dashboard", dashboardRoute);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
