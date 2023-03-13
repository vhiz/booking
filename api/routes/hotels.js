const {
  getHotels,
  getHotel,
  addHotel,
  deleteHotel,
  updateHotel,
  countByCity,
  countByType,
  features,
} = require("../controllers/hotels");
const { verifyAdmin } = require("../utils/token");

const router = require("express").Router();

router.get("/", getHotels);

router.get("/:featured/:amount", features);

router.get("/find/:id", getHotel);

router.post("/", addHotel);

router.delete("/:id",  deleteHotel);

router.put("/:id", updateHotel);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

module.exports = router;
