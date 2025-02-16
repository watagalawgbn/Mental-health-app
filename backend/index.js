require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");

const app = express();

mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.246.44"],
    credentials: true
}));

app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => 
    console.log(`Server running on port ${PORT}`)
);