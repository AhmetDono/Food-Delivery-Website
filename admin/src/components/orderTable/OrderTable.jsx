import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows,orderColums } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { getAllOrders } from "../../store/apiCalls";
import { useDispatch,useSelector } from "react-redux";

const OrderTable = () => {
  const [data, setData] = useState(userRows);

  const dispacth = useDispatch();
  const orders = useSelector((state)=>state.order.orders);
  useEffect(()=>{
    getAllOrders(dispacth)
  },[dispacth])
  console.log(orders)

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
  return (
    <div className="datatable">
      <div className="datatableTitle">
        ALL ORDERS
      </div>
      <DataGrid
        className="datagrid"
        rows={orders}
        columns={orderColums.concat(actionColumn)}
        pageSize={9}
        getRowId={row => row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default OrderTable;
