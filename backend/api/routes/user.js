const express = require("express");
const { register, sigin } = require("../controllers/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Checking User");
});

router.post("/register", register);
router.post("/login", sigin);

module.exports = router;
