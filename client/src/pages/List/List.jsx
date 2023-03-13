import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.scss";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/SearchItem/SearchItem";
import { CircularProgress } from "@mui/material";
import SignalWifiStatusbarConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4";
import useFetch from "../../hook";

export default function List() {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [search, setSearch] = useState({
    max: 999,
    min: 0,
    destination: destination,
  });
  const capitalized = search.destination || "A";
  const city = capitalized[0].toUpperCase() + capitalized.substring(1);

  const { data, isLoading, error, refetch } = useFetch(
    `/hotels?city=${city}&min=${search.min}&max=${search.max}`
  );
  const handleChange = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    refetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContanier">
        <div className="listWrapper">
          <div className="listSearch">
            <h1>Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                type="text"
                placeholder={destination}
                name="destination"
                onChange={handleChange}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
            </div>
            {openDate && (
              <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
                className="date"
              />
            )}

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span>
                    Min price <small> per night</small>
                  </span>
                  <input type="number" onChange={handleChange} name="min" />
                </div>
                <div className="lsOptionItem">
                  <span>
                    Max price <small> per night</small>
                  </span>
                  <input type="number" onChange={handleChange} name="max" />
                </div>
                <div className="lsOptionItem">
                  <span>Adult</span>
                  <input type="number" min={1} placeholder={options.adult} />
                </div>
                <div className="lsOptionItem">
                  <span>Children</span>
                  <input type="number" min={0} placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span>Room</span>
                  <input type="number" min={1} placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {error ? (
              <SignalWifiStatusbarConnectedNoInternet4Icon />
            ) : isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
