import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./house.scss";
import PlaceIcon from "@mui/icons-material/Place";
import MailList from "../../components/MailList/MailList";
import Footer from "../../components/footer/Footer";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { SearchContext } from "../../context/dataContext";
import { AuthContext } from "../../context/authContext";
import Reserve from "../../components/reserve/Reserve";
import useFetch from "../../hook";

export default function House() {
  const location = useLocation();
  const id = `${location.pathname.split("/")[2]}`;
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const { isLoading, error, data } = useQuery(["hotel"], async () => {
    const res = await makeRequest.get(`hotel/${id}`);
    return res.data;
  });

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(!open);
  };

  const { data: name } = useFetch(`hotel/${id}`);

  const { date, options } = useContext(SearchContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(date[0].endDate, date[0].startDate);
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (currentUser) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {error ? (
        <ErrorIcon />
      ) : isLoading ? (
        "loading"
      ) : (
        <div className="hotelContanier">
          {open && (
            <div className="slider">
              <CloseIcon className="close" onClick={() => setOpen(false)} />
              <KeyboardArrowLeftIcon
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" />
              </div>
              <KeyboardArrowRightIcon
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="BookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1>{data.name}</h1>
            <div className="hotelAdress">
              <PlaceIcon />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent Location - {data.distance} from center
            </span>
            <span className="hotelPriceHiglight">
              Book for a night and get excellent discount and price of $
              {data.cheapestPrice}
            </span>
            <div className="hotelImges">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img onClick={() => handleOpen(i)} src={photo} alt="" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1>{data.title}</h1>
                <p>{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for {days} nights</h1>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eveniet, dolores. Amet rerum eius doloribus facilis molestiae
                  placeat
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && (
        <Reserve
          setOpenModal={setOpenModal}
          hotelId={id}
          hotelName={name.name}
        />
      )}
    </div>
  );
}
