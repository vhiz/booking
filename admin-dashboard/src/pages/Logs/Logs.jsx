import { ErrorOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { makeRequest } from "../../axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./logs.scss";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function Logs() {
  const { isLoading, error, data } = useQuery(["notification"], async () => {
    const res = await makeRequest.get("/logs");
    return res.data;
  });

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser");
  }, [socket]);
  return (
    <div className="log">
      <Sidebar />
      <div className="logContainer">
        <Navbar socket={socket} />
        {error ? (
          <ErrorOutline />
        ) : isLoading ? (
          <CircularProgress />
        ) : data.length === 0 ? (
          <span className="noinfo">No Log input</span>
        ) : (
          <div className="contanier">
            {data.map((d) => (
              <div className="log" key={data._id}>
                <div className="left">
                  <p>{d.msg}</p>
                </div>
                <div className="right">
                  <p>{moment(d.createdAt).calendar()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
