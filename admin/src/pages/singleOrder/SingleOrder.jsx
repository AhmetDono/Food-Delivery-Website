import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import OrderDetails from "../../components/orderDetails/Table";

const SingleOrder = () => {
  const location = useLocation();
  const orderId=location.pathname.split("/")[2];

  const order = useSelector((state)=>
  state.order.orders.find(order=>order._id===orderId));
  console.log(order)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="bottom">
        <h1 className="title">Order History</h1>
        <h1 className="title_two">Order ID: {order._id}</h1>
          <div className="top">
            <div className="left">
              <h1 className="title">Order Holder Information</h1>
              <div className="item">
                <img src={order.userId.img} alt="" className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">{order.userId.userName || ""}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{order.userId.email || ""}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">+{order.userId.phoneNumber || ""}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                    {order.userId.address &&
                    order.userId.address.city &&
                    order.userId.address.streetAddress &&
                    order.userId.address.postalCode
                      ? order.userId.address.city +
                        " " +
                        order.userId.address.streetAddress +
                        " " +
                        order.userId.address.postalCode
                      : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
          <h1 className="title">Order Details</h1>
          <OrderDetails/>
        </div>
        </div>
        </div>
        </div>
        
  );
};

export default SingleOrder;
