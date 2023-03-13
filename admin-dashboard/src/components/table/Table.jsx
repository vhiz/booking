import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { ErrorOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import moment from "moment";

export default function Tables({ type, id }) {
  let rows;

  switch (type) {
    case "users":
      rows = {
        query: "userLogs",
        url: "/userlog",
      };
      break;
    case "user":
      rows = {
        query: "userLog",
        url: `/userlog/${id}`,
      };
      break;
    default:
      break;
  }

  const { isLoading, error, data } = useQuery([`${rows.query}`, rows.query], async () => {
    const res = await makeRequest.get(`${rows.url}`);
    return res.data;
  });

  return (
    <TableContainer component={Paper} className="table">
      {error ? (
        <ErrorOutline />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Hotel</TableCell>
              <TableCell className="tableCell">RommId</TableCell>
              <TableCell className="tableCell">Dates</TableCell>
              <TableCell className="tableCell">UserId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">{row.hotel}</TableCell>
                {row.room.map((r) => (
                  <>
                    <TableCell className="tableCell">{r.number}</TableCell>
                    <TableCell className="tableCell">
                      {r.unavialableDates.map((rnumber) =>
                        moment(rnumber).calendar()
                      )}
                      {/* {r.unavialableDates} */}
                    </TableCell>
                  </>
                ))}
                <TableCell className="tableCell">{row.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
