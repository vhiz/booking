import { ErrorOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Tables from "../../components/table/Table";
import "./hotel.scss";

export default function Hotel() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { isLoading, error, data } = useQuery(["hotel"], async () => {
    const res = await makeRequest.get(`/hotel/${id}`);
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
              {data.featured && <div className="featured">Featured</div>}
              <h1 className="eTitle">Information</h1>
              <div className="item">
                <img
                  src={
                    data.photos[0] ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9v9OavWpb0j-stXfsuAuVYwYMmGMp5K8VuQ&usqp=CAU"
                  }
                  alt=""
                />
                <div className="details">
                  <h1>{data.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Cheapest Price:</span>
                    <span className="itemValue">${data.cheapestPrice}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Distance:</span>
                    <span className="itemValue">{data.distance}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">City:</span>
                    <span className="itemValue">{data.city}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Title:</span>
                    <span className="itemValue">{data.title}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Type:</span>
                    <span className="itemValue">{data.type}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="right">
            <Chart aspect={3 / 1} title={"User spending (last 6 Months)"} />
          </div>
        </div>
        <div className="bottom">
          <h1 className="eTitle">Last Transactions</h1>
          <Tables />
        </div>
      </div>
    </div>
  );
}
