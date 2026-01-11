import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/configs/db.js";
import routes from "./src/routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://react-blog-byasif.netlify.app',
  credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api/blogs", routes);

// Home route
app.get("/", (req, res) => {
  res.send("Blogs API Endpoint...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
