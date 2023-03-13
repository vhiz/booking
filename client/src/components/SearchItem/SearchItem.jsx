import { Link } from "react-router-dom";
import "./searchItem.scss";

export default function SearchItem({ item }) {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" />
      <div className="siDesc">
        <h1>{item.name}</h1>
        <span className="siDistance">{item.distance} from center</span>
        <span className="TaxiOp">Free AirPort taix</span>
        <span className="siSubtitle">Studio Apartment With AirCondition</span>
        <span className="siFeautures">{item.desc}</span>
        <span className="siCancleOp">Free cancelation</span>
        <span className="siCancleOpSubtitle">You can cancle Later</span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes and fees. </span>
          <Link to={`/hotels/${item._id}`}>
          <button>See avaliability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
