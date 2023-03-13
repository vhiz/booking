const {
  getRooms,
  getRoom,
  addRoom,
  deleteRoom,
  updateRoom,
  updateRoomAvability,
} = require("../controllers/rooms");
const { verifyAdmin } = require("../utils/token");

const router = require("express").Router();

router.get("/", getRooms);

router.get("/:id", getRoom);

router.post("/:hotelid", addRoom);

router.delete("/:id/:hotelid",  deleteRoom);

router.put("/:id", updateRoom);

router.put("/availability/:id", updateRoomAvability);

module.exports = router;
