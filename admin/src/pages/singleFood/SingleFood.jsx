import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
//import List from "../../components/table/Table";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleFood = () => {

  const location = useLocation();
  const foodId=location.pathname.split("/")[2];

  const Food = useSelector((state)=>
  state.food.foods.find(food=>food._id===foodId));

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Link to={`/food/editFoodDetails/${foodId}`}>
            <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={Food.image}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{Food.foodName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Description</span>
                  <span className="itemValue">{Food.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{Food.price} $</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Categories:</span>
                  <span className="itemValue">{Food.cat.join(', ')}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sizes:</span>
                  <span className="itemValue">{Food.size.join(', ')}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">InStock:</span>
                  <span className="itemValue">{Food.inStock}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        {/*<div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>*/}
      </div>
    </div>
  );
};

export default SingleFood;
