const { getAllLogs } = require("../controllers/logs");
const { verifyAdmin } = require("../utils/token");

const router = require("express").Router();
router.get("/", getAllLogs);

module.exports = router;
