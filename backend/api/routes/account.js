const express = require("express");
const { getBalance, transfer } = require("../controllers/accountController");
const router = express.Router();
const protect = require("../middleware/auth");
router.get("/balance", protect, getBalance);
router.post("/transfer", protect, transfer);
module.exports = router;
