export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "Username",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.img ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPrvDwVG49SBYvvDQI0IqEFnuPr-iMGT7UA&usqp=CAU"
            }
            alt=""
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone no",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
];

export const hotelColums = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
