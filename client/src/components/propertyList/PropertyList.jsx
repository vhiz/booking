import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./propertyList.scss";
import { Skeleton } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function PropertyList() {
  const { isLoading, error, data } = useQuery(["type"], async () => {
    const res = await makeRequest.get("hotels/countByType");
    return res.data;
  });

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3uT3ydvDXcBthWmN1qZnxA6gi82jHkt7FbQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXB_ZLCNH7O__O1c0bniWsXX6GMrJjFb3W7Q&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCBRk0qPNinYZYPRCL9umgCTgbCupFpcyfQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTab2zHCMDc54aqdekV0v19X8me8OQ6bQNnlQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXKXdkw3LshGzky06CUQnJirFXmRn5BtGgig&usqp=CAU",
  ];

  return (
    <div className="pList">
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
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={data[i].type}>
                <img src={img} alt="" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
