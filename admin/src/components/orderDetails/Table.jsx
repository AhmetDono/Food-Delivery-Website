import React, {  } from "react";
import { useSelector } from "react-redux";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";

const OrderDetails  = () => {
  const location = useLocation();
  const orderId=location.pathname.split("/")[2];

  const order = useSelector((state)=>
  state.order.orders.find(order=>order._id===orderId));
  console.log(order)
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Foods</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">Number Of Products</TableCell>
            <TableCell className="tableCell">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={order._id}>
              <TableCell className="tableCell">
                <ul>
                {order.foods.map((food) => {
                    const foodIDs = food?.foodId.foodName || "Food Name Not Available";
                    return (
                      <li key={food?._id}>
                        {foodIDs}
                      </li>
                    );
                  })}
                </ul>
              </TableCell>
              <TableCell className="tableCell">{order.createdAt}</TableCell>
              <TableCell className="tableCell">{order.address}</TableCell>
              <TableCell className="tableCell">{order.foods.reduce((total, food) => total + food.quantity, 0)}</TableCell>
              <TableCell className="tableCell">{order.total}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetails ;
