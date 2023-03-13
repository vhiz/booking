import "./widget.scss";
import Profile from "../../icons/profile.png";
import Wallet from "../../icons/wallet.png";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { ErrorOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Hotel from "../../icons/hotel.png";
import Room from "../../icons/room.png";

export default function Widget({ type }) {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: Profile,
        path: "users",
        url: "/users",
      };
      break;
    case "hotels":
      data = {
        title: "HOTELS",
        isMoney: false,
        link: "View all hotels",
        icon: Hotel,
        path: "hotels",
        url: "/hotels",
      };
      break;
    case "rooms":
      data = {
        title: "ROOMS",
        isMoney: false,
        link: "See all rooms",
        icon: Room,
        path: "rooms",
        url: "/rooms",
      };
      break;
    case "amount":
      data = {
        title: "EARNNGS",
        isMoney: true,
        link: "See details",
        icon: Wallet,
        path: "amount",
      };
      break;
    default:
      break;
  }

  const {
    isLoading,
    error,
    data: dataWidegt,
  } = useQuery([`${data.path}`], async () => {
    const res = await makeRequest.get(`/${data.path}`);
    return res.data;
  });

  return (
    <div className="widget">
      {error ? (
        <ErrorOutline />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
              {data.isMoney && "$"} {dataWidegt.length}
            </span>
            <Link to={`${data.url}`} style={{ textDecoration: "none" }}>
              <span className="link">{data.link}</span>
            </Link>
          </div>
          <div className="right">
            <img src={data.icon} alt="" />
          </div>
        </>
      )}
    </div>
  );
}
