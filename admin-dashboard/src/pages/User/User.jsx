import { ErrorOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Tables from "../../components/table/Table";
import "./user.scss";

export default function User() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { isLoading, error, data } = useQuery(["user", id], async () => {
    const res = await makeRequest.get(`/users/${id}`);
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
              {data.isAdmin && <div className="admin">Admin</div>}
              <h1 className="eTitle">Information</h1>
              <div className="item">
                <img
                  src={
                    data.img ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPrvDwVG49SBYvvDQI0IqEFnuPr-iMGT7UA&usqp=CAU"
                  }
                  alt=""
                />
                <div className="details">
                  <h1>{data.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{data.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{data.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{data.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">{data.country}</span>
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
          <h1 className="eTitle">Bookings</h1>
          <Tables type="user" id={id} />
        </div>
      </div>
    </div>
  );
}
