import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";

export default function List({columns, title}) {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContanier">
        <Navbar />
        <Datatable columns={columns} title={title}/>
      </div>
    </div>
  );
}
