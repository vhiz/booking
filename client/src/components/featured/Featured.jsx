import "./featured.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import {  Skeleton } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function Featured() {
  const { isLoading, error, data } = useQuery(["cities"], async () => {
    const res = await makeRequest.get(
      "/hotels/countByCity?cities=Lagos,Enugu,Abuja"
    );
    return res.data;
  });

  return (
    <div className="featured">
      {error ? (
        <ErrorIcon />
      ) : isLoading ? (
        <>
          <Skeleton variant="rounded" width={256.66} height={250} />
          <Skeleton variant="rounded" width={256.66} height={250} />
          <Skeleton variant="rounded" width={256.66} height={250} />
        </>
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://c0.wallpaperflare.com/preview/197/580/946/nature-nigeria-abuja-sky.jpg"
              alt=""
            />
            <div className="featuredTitles">
              <h1>Lagos</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://c0.wallpaperflare.com/preview/5/284/868/nigeria-abuja-usuma-dam-dam-ocean-sea-water-nature-boat-boy-girl-canoe-headwrap-paddle-row.jpg"
              alt=""
            />
            <div className="featuredTitles">
              <h1>Enugu</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://c0.wallpaperflare.com/preview/687/643/806/four-assorted-color-boats-on-body-of-water-during-daytime.jpg"
              alt=""
            />
            <div className="featuredTitles">
              <h1>Abuja</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
