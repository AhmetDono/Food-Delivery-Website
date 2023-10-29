import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import FoodList from "./pages/foodList/FoodList";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { foodInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import SingleFood from "./pages/singleFood/SingleFood";
import NewFood from "./pages/new Food/NewFood";
import OrderList from "./pages/orderList/OrderList";
import SingleOrder from "./pages/singleOrder/SingleOrder";
import Logs from "./pages/logs/Logs";
import { useSelector } from "react-redux";
import EditProfile from "./pages/editProfile/EditProfile";
import EditFood from "./pages/editFood/EditFood";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector((state) => state.auth.currentUser);
  const isAdmin = useSelector((state) => state.auth.currentUser.isAdmin);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="user/:userId">
              <Route index element={<Single />} />
            </Route>
            <Route
              path="login"
              element={user || isAdmin ? <Home /> : <Login />}
            />
            {isAdmin && (
              <>
                <Route path="users" element={<List />} />
                <Route path="user/:userId" element={<Single />} />
                <Route
                  path="user/editProfile/:userId"
                  element={
                    <EditProfile
                      inputs={userInputs}
                      title="Edit User Profile"
                    />
                  }
                />
                <Route path="foods" element={<FoodList />} />
                <Route path="food/:foodId" element={<SingleFood />} />
                <Route
                  path="foods/new"
                  element={<NewFood inputs={foodInputs} title="Add New Food" />}
                />
                <Route
                  path="food/editFoodDetails/:foodId"
                  element={
                    <EditFood
                      inputs={foodInputs}
                      title="Edit Food Details"
                    />
                  }
                />
                <Route path="orders" element={<OrderList />} />
                <Route path="orders/:orderID" element={<SingleOrder />} />
                <Route path="logs" element={<Logs />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
