const { register, login, logout, adminLogin } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

router.post("/admin/login", adminLogin);

router.get("/logout", logout);

module.exports = router;
