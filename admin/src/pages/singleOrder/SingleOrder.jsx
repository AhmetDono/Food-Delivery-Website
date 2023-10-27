import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";

const SingleOrder = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="bottom">
        <h1 className="title">Order History</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
