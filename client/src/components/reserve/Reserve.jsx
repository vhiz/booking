import "./reserve.scss";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/dataContext";
import { useNavigate } from "react-router-dom";
export default function Reserve({ setOpenModal, hotelId, hotelName }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { date } = useContext(SearchContext);

  const { isLoading, error, data } = useQuery(["rooms"], async () => {
    const res = await makeRequest.get(`hotel/room/${hotelId}`);
    return res.data;
  });
  const navigate = useNavigate();
  //alternate method
  const getDates = (start, end) => {
    const dates = new Date(start.getTime());

    const date = [];

    while (dates <= end) {
      date.push(new Date(dates).getTime());
      dates.setDate(dates.getDate() + 1);
    }

    return date;
  };

  const startDate = new Date(date[0].startDate);
  const endDate = new Date(date[0].endDate);

  const alldates = getDates(startDate, endDate);
  // const alldates = Array.from(datesBetween(startDate, endDate));

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavialableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await makeRequest.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
            hotelname: hotelName,
          });
          return res.data;
        })
      );
      navigate("/");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="reserve">
      {error ? (
        <ErrorIcon />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <div className="rContanier">
          <CancelRoundedIcon
            className="rclose"
            onClick={() => setOpenModal(false)}
          />
          <span>Select your rooms:</span>
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people :<b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rselectRoom">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleClick}>Reserve Now!</button>
        </div>
      )}
    </div>
  );
}
