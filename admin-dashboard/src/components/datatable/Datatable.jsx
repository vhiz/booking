import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { ErrorOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export default function Datatable({ columns, title }) {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { isLoading, error, data } = useQuery([`${path}`], async () => {
    const res = await makeRequest.get(`/${path}`);
    return res.data;
  });
  const [list, setList] = useState(data);

  const handleDelete = async (id) => {
    try {
      await makeRequest.delete(`/${path}/${id}`);
      setList(data.filter((item) => item._id !== id));
    } catch (err) {}
  };
  const actionColum = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="view">View</div>
            </Link>
            <div
              className="delete"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="dataTitle">
        {title}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {error ? (
        <ErrorOutlined />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={list || data}
          columns={columns.concat(actionColum)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          className="datagrid"
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
}
