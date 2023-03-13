const { Hotel } = require("../model/Hotel");
const { Logs } = require("../model/Logs");

const getHotels = async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      city: { $regex: new RegExp(req.query.city, "i") },
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const features = async (req, res) => {
  const amount = req.params.amount;
  const featured = req.params.featured;
  try {
    const hotels = await Hotel.find({ featured: featured }).limit(amount);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json("Hotel not found");

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);

    await Logs.create({
      msg: `${savedHotel.name} was created at - `,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    await Logs.create({
      msg: `${hotel.name} was deleted at -  `,
    });
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json("deleted succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateHotel = async (req, res) => {
  try {
    const update = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    await Logs.create({
      msg: `${update.name} was updated at - `,
    });
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json(error);
  }
};

const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  const abuja = await Hotel.countDocuments({ city: "Abuja" });
  const lagos = await Hotel.countDocuments({ city: "Lagos" });
  const enugu = await Hotel.countDocuments({ city: "Enugu" });
  try {
    //error keeps adding everyting up
    // const list = await Promise.all(
    //   cities.map((city) => {
    //     return Hotel.countDocuments({ city: cities });
    //   })
    // );

    const list = [lagos, enugu, abuja];

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};

const countByType = async (req, res) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getHotel,
  getHotels,
  addHotel,
  deleteHotel,
  updateHotel,
  countByCity,
  countByType,
  features,
};
