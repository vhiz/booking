/* eslint-disable no-unused-vars */
import "./newhotel.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Image from "../../icons/image.png";
import { DriveFolderUploadOutlined, ErrorOutline } from "@mui/icons-material";
import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
// import { CircularProgress } from "@mui/material";
import axios from "axios";

export default function NewHotel({ title, inputs }) {
  const [files, setFiles] = useState("");

  const [info, setInfo] = useState({});
  const [message, setMessage] = useState("");
  const [errorM, setError] = useState("");
  // const [rooms, setRooms] = useState([]);
  // const { isLoading, error, data } = useQuery(["rooms"], async () => {
  //   const res = await makeRequest.get("/rooms");
  //   return res.data;
  // });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleSelect = (e) => {
  //   const value = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setRooms(value);
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dsemmhzl3/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      const newhotel = {
        ...info,
        photos: list,
      };

      await makeRequest.post("/hotels", newhotel);
      setMessage("User created succesfully!");
    } catch (error) {
      setError("Something went wrong");
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
          <div className="left">
            <img src={files ? URL.createObjectURL(files[0]) : Image} alt="" />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}: </label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured: </label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              {/* <div className="selectRooms">
                <label>Rooms: </label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {error ? (
                    <ErrorOutline />
                  ) : isLoading ? (
                    <CircularProgress />
                  ) : (
                    data &&
                    data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))
                  )}
                </select>
              </div> */}
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
