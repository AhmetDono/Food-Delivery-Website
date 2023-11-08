import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/apiCalls";
import "./table5.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userRows, orderColums } from "../../datatablesource";
import { Link } from "react-router-dom";
const OrdersTable  = () => {
  const [data, setData] = useState(userRows);
  const dispacth = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  useEffect(() => {
    getAllOrders(dispacth);
  }, [dispacth]);
  console.log(orders);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/orders/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Get the last 5 orders
  const last5Orders = orders.slice(-5);

  return (
    <div className="datatable">
      <div className="datatableTitle">LAST 5 ORDERS</div>
      <DataGrid
        className="datagrid"
        rows={last5Orders}
        columns={orderColums.concat(actionColumn)}
        pageSize={5} // Show 5 rows per page
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};


export default OrdersTable ;
