import Home from "./pages/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Login from "./pages/login/Login";
import { hotelInputs, userInputs, roomInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkMode";
import "./app.scss";
import { AuthContext } from "./context/authContext";
import { hotelColums, roomColumns, userColumns } from "./dataSource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import Hotel from "./pages/Hotel/Hotel";
import Room from "./pages/Room/Room";
import User from "./pages/User/User";
import Logs from "./pages/Logs/Logs";

export default function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/users"
            element={
              currentUser ? (
                <List columns={userColumns} title={"Add New User"} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/users/:userid"
            element={currentUser ? <User /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/users/new"
            element={
              currentUser ? (
                <New inputs={userInputs} title={"Add New User"} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/hotels"
            element={
              currentUser ? (
                <List columns={hotelColums} title={"Add New Hotel"} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/hotels/:hotelid"
            element={currentUser ? <Hotel /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/hotels/new"
            element={
              currentUser ? (
                <NewHotel inputs={hotelInputs} title={"Add New Hotel"} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/rooms"
            element={
              currentUser ? (
                <List columns={roomColumns} title={"Add New Room"} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/rooms/:roomid"
            element={currentUser ? <Room /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/rooms/new"
            element={
              currentUser ? (
                <NewRoom inputs={roomInputs} title={"Add New Room"} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/logs"
            element={currentUser ? <Logs /> : <Navigate to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
