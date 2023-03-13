import { CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./navbar.scss";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await logout();
    navigate("/login");
    setIsLoading(false);
  };
  return (
    <div className="navbar">
      <div className="navContanier">
        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <span>Aura Bookings</span>
        </Link>
        {currentUser ? (
          <div className="navItems">
            <span>{currentUser.username}</span>
            <button onClick={handleLogout}>
              {isLoading ? <CircularProgress /> : "Logout"}
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button>
              <Link
                to={"/register"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Register
              </Link>
            </button>
            <button>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
