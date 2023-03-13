import { ErrorOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./room.scss";

export default function Room() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { isLoading, error, data } = useQuery(["room", id], async () => {
    const res = await makeRequest.get(`/rooms/${id}`);
    return res.data;
  });

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContanier">
        <Navbar />
        <div className="top">
          {error ? (
            <ErrorOutline />
          ) : isLoading ? (
            <CircularProgress />
          ) : (
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="eTitle">Information</h1>
              <div className="item">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9v9OavWpb0j-stXfsuAuVYwYMmGMp5K8VuQ&usqp=CAU"
                  }
                  alt=""
                />
                <div className="details">
                  <h1>{data.title}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Max People:</span>
                    <span className="itemValue">{data.maxPeople}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">${data.price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{data.desc}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Room Numbers:</span>
                    <span className="itemValue">
                      {data.roomNumbers.map((roomNumber) => roomNumber.number)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="right">
            <Chart aspect={3 / 1} title={"User spending (last 6 Months)"} />
          </div>
        </div>
      </div>
    </div>
  );
}
