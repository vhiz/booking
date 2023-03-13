const router = require("express").Router();
const { getSingleHotel, getHotelRoom } = require("../controllers/hotel");
router.get("/:id", getSingleHotel);
router.get("/room/:id", getHotelRoom);

module.exports = router;
