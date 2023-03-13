const express = require("express");
const { connect, set } = require("mongoose");
const app = express();
require("dotenv/config");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.CORS, process.env.CORS2],
  },
});

set("strictQuery", false);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: [process.env.CORS, process.env.CORS2],
  })
);

//routes
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const hotelRoute = require("./routes/hotel");
const roomsRoute = require("./routes/rooms");
const usersRoute = require("./routes/users");
const userLogRoute = require("./routes/userlog");
const logRoute = require("./routes/logs");

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/userlog", userLogRoute);
app.use("/api/logs/", logRoute);

const db = async () => {
  try {
    connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error.message);
  }
};

//socket

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

const Port = process.env.PORT || 8080;

httpServer.listen(Port, () => {
  db();
  console.log(`port Open at ${Port}`);
});
