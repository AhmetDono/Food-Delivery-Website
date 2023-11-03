import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/apiCalls";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    getAllOrders(dispatch);
  }, [dispatch]);
  console.log(orders)
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">Foods</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="tableCell">{order._id}</TableCell>
              <TableCell className="tableCell">{order.userId.userName}</TableCell>
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
              <TableCell className="tableCell">{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
