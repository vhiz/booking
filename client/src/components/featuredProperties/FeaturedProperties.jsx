import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./featuredProperties.scss";
import ErrorIcon from "@mui/icons-material/Error";
import { Skeleton } from "@mui/material";
import HotelPic from "../../asset/hotel.jpg";
export default function FeaturedProperties() {
  const { isLoading, error, data } = useQuery(["property"], async () => {
    const res = await makeRequest.get("hotels/true/4");
    return res.data;
  });
  return (
    <div className="fp">
      {error ? (
        <ErrorIcon />
      ) : isLoading ? (
        <>
          <Skeleton variant="rounded" width={210} height={150} />
          <Skeleton variant="rounded" width={210} height={150} />
          <Skeleton variant="rounded" width={210} height={150} />
          <Skeleton variant="rounded" width={210} height={150} />
          <Skeleton variant="rounded" width={210} height={150} />
        </>
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0] ? item.photos[0] : HotelPic }
                alt=""
              />
              <span className="fpName">{item.name} </span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Good</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
