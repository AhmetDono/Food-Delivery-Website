import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Single = () => {
  const location = useLocation();
  const userId=location.pathname.split("/")[2];

  const User = useSelector((state)=>
  state.user.users.find(user=>user._id===userId));

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to={`/user/editProfile/${userId}`}>
            <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={User.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{User.userName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{User.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+{User.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {User.address.city +" "+ User.address.streetAddress +" "+ User.address.postalCode }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Orders</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
