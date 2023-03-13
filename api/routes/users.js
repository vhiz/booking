const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/users");
const { verifyAdmin } = require("../utils/token");

const router = require("express").Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.get("/me", getUser);

router.put("/", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
