const express = require("express");
const { register } = require("../controllers/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Checking User");
});

router.post("/register", register);

module.exports = router;
