import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/upload.route.js";

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",  
  "https://sof-event-extractor-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Server.js");
});

app.use("/", uploadRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
