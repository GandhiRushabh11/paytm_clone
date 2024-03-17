const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./config/db");
const rootRouter = require("./routes/index");

const app = new express();

// DB Collection
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Router Mounting
app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost: ${PORT}`);
});
