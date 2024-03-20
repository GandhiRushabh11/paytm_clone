const express = require("express");
const {
  register,
  signin,
  updateUser,
  getUsers,
} = require("../controllers/userController");
const protect = require("../middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Checking User");
});
router.get("/bulk", getUsers);
router.post("/register", register);
router.post("/login", signin);
router.put("/", protect, updateUser);
module.exports = router;
