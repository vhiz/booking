import "./sidebar.scss";
import Dashboard from "../../icons/dashboard.png";
import Logout from "../../icons/logout.png";
import Notification from "../../icons/notification.png";
import Room from "../../icons/room.png";
import Hotel from "../../icons/hotel.png";
import Profile from "../../icons/profile.png";
import Setting from "../../icons/settings.png";

import Users from "../../icons/users.png";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkMode";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
export default function Sidebar() {
  const { toggle } = useContext(DarkModeContext);
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>Admin dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p>MAIN</p>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li>
              <img src={Dashboard} alt="" className="icon" />
              <span>Dasboard</span>
            </li>
          </Link>
          <p>LIST</p>
          <Link to={"/users"} style={{ textDecoration: "none" }}>
            <li>
              <img src={Users} alt="" className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to={"/hotels"} style={{ textDecoration: "none" }}>
            <li>
              <img src={Hotel} alt="" className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to={"/rooms"} style={{ textDecoration: "none" }}>
            <li>
              <img src={Room} alt="" className="icon" />
              <span>Room</span>
            </li>
          </Link>

          <p>USEFUL</p>
          <Link to={"/logs"} style={{ textDecoration: "none" }}>
            <li>
              <img src={Notification} alt="" className="icon" />
              <span>Notifications</span>
            </li>
          </Link>
          <p>SERVICE</p>
          <li>
            <img src={Setting} alt="" className="icon" />
            <span>Settings</span>
          </li>
          <p>USER</p>
          <li>
            <img src={Profile} alt="" className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <img src={Logout} alt="" className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={toggle}></div>

        <div className="colorOption" onClick={toggle}></div>
      </div>
    </div>
  );
}
