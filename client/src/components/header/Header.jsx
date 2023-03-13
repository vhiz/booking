import "./header.scss";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/dataContext";
import { AuthContext } from "../../context/authContext";

export default function Header({ type }) {
  const { currentUser } = useContext(AuthContext);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContanier listMode" : "headerContanier"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <HotelIcon className="icon" />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FlightIcon className="icon" />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <DirectionsCarIcon className="icon" />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <HotelIcon className="icon" />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <LocalTaxiIcon className="icon" />
            <span>Taxi</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1>Find all your comfort here</h1>
            <p>Travel safe with our disccount at 10% on first booking</p>
            {!currentUser && (
              <button>
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sigin/Register
                </Link>
              </button>
            )}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <HotelIcon className="headerIcon" />
                <input
                  type="text"
                  placeholder="Search destination"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <CalendarMonthIcon className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  date[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className="date"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <PersonIcon className="headerIcon" />
                <span
                  onClick={() => {
                    setOpenOptions(!openOptions);
                  }}
                >{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span>Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          onClick={() => handleOptions("adult", "d")}
                        >
                          -
                        </button>
                        <span>{`${options.adult}`}</span>
                        <button onClick={() => handleOptions("adult", "i")}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span>Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          onClick={() => handleOptions("children", "d")}
                        >
                          -
                        </button>
                        <span>{`${options.children}`}</span>
                        <button onClick={() => handleOptions("children", "i")}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span>Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          onClick={() => handleOptions("room", "d")}
                        >
                          -
                        </button>
                        <span>{`${options.room}`}</span>
                        <button onClick={() => handleOptions("room", "i")}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
