const { Rooms } = require("../model/Rooms");
const { Hotel } = require("../model/Hotel");
const { UserLog } = require("../model/UserLog");
const { verify } = require("jsonwebtoken");
const { Logs } = require("../model/Logs");
const { User } = require("../model/User");

const getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRoom = async (req, res) => {
  try {
    const room = await Rooms.findById(req.params.id);
    if (!room) return res.status(404).json("Room not found");

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Rooms(req.body);

  try {
    const savedRoom = await newRoom.save();

    const hotel = await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });

    await Logs.create({
      msg: `${savedRoom.title}  was added to ${hotel.name} as one of the rooms at -  `,
    });

    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  try {
    const deleter = await Rooms.findById(req.params.id);

    const room = await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
    const deleteRoom = await Rooms.findByIdAndDelete(req.params.id);
    await Logs.create({
      msg: `${deleteRoom.name} was deleted from hotel ${room.name} at - `,
    });

    res.status(200).json("deleted succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRoom = async (req, res) => {
  try {
    const update = await Rooms.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    await Logs.create({
      msg: `${update.title} was update at - `,
    });
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRoomAvability = async (req, res) => {
  try {
    const rooms = await Rooms.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavialableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getRoom,
  getRooms,
  addRoom,
  deleteRoom,
  updateRoom,
  updateRoomAvability,
};
