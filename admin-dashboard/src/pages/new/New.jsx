import "./new.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Image from "../../icons/image.png";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState } from "react";
import { makeRequest } from "../../axios";
import axios from "axios";

export default function New({ title, inputs }) {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({
    username: "",
    password: "",
    email: "",
    img: "",
    phone: "",
    address: "",
    country: "",
  });
 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dsemmhzl3/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const user = {
        username: info.username,
        password: info.password,
        email: info.email,
        phone: info.phone,
        address: info.address,
        country: info.country,
        img: url,
      };

      await makeRequest.post("/auth/register", user);
      setInfo(null)
      setMessage("User created succesfully!")
    } catch (error) {
      setError('somthing went wrong')
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
            <img src={file ? URL.createObjectURL(file) : Image} alt="" />
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}: </label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
              {message && <span className="message">{message}</span>}
              {error && <span className="error">{error}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
