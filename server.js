import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/upload.route.js";

dotenv.config()

const app = express();

// CORS setup for localhost:5174
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello from Server.js");
});

app.use('/', uploadRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`);
});
