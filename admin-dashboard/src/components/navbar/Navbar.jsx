import "./navbar.scss";
import Search from "../../icons/search.png";
import Language from "../../icons/language.png";
import Moon from "../../icons/dark.png";
import Sun from "../../icons/sun.png";
import Notification from "../../icons/notification.png";
import Log from "../../icons/log.png";
import { DarkModeContext } from "../../context/darkMode";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="search" />
          <img src={Search} alt="" />
        </div>
        <div className="items">
          <div className="item">
            <img src={Language} alt="" />
            <span>English</span>
          </div>
          <div className="item">
            {darkMode ? (
              <img src={Sun} alt="" onClick={toggle} />
            ) : (
              <img src={Moon} alt="" onClick={toggle} />
            )}
          </div>
          <div className="item">
            <img src={Notification} alt="" />
            <div className="counter">1</div>
          </div>
          <Link to={"/logs"} style={{ textDecoration: "none" }}>
            <div className="item">
              <img src={Log} alt="" />
            </div>
          </Link>
          <div className="item">
            <img
              src={
                currentUser.img ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPrvDwVG49SBYvvDQI0IqEFnuPr-iMGT7UA&usqp=CAU"
              }
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
