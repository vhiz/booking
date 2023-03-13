const { Hotel } = require("../model/Hotel");
const { Rooms } = require("../model/Rooms");

const getSingleHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json("Hotel not found");

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getHotelRoom = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Rooms.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getSingleHotel, getHotelRoom };
