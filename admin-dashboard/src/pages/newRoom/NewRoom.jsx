import "./newroom.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { ErrorOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

export default function NewRoom({ title, inputs }) {
  const [message, setMessage] = useState("");
  const [errorM, setError] = useState("");
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const { isLoading, error, data } = useQuery(["hotels"], async () => {
    const res = await makeRequest.get("/hotels");
    return res.data;
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    try {
      await makeRequest.post(`rooms/${hotelId}`, { ...info, roomNumbers });
      setMessage("Room created");
    } catch (error) {
      setMessage('')
      setError("Something went wrong!");
      
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}: </label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    id={input.id}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms: </label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Give comma before a room"
                  className="roomSelect"
                />
              </div>
              <div className="formInput">
                <label>Chose a hotel </label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {error ? (
                    <ErrorOutline />
                  ) : isLoading ? (
                    <CircularProgress />
                  ) : (
                    data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))
                  )}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
              {message && <span className="message">{message}</span>}
              {errorM && <span className="error">{errorM}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
