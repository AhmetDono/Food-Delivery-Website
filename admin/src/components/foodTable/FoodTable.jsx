import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { foodColums } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood, getAllFoods } from "../../store/apiCalls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const FoodTable = () => {
  const showDeleteFoodToast = () => {
    toast.success("Urun basariyla silindi!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const dispacth = useDispatch();
  const food = useSelector((state)=>state.food.foods);
  useEffect(()=>{
    getAllFoods(dispacth)
  },[dispacth])

  const handleDelete = (id,e) => {
    e.preventDefault();
    deleteFood(dispacth,id)
    showDeleteFoodToast()
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/food/" + params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={"/food/editFoodDetails/" + params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <button
              className="deleteButton"
              onClick={(e) => handleDelete(params.row._id,e)}
              >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Food
        <Link to="/foods/new" className="link">
          Add New Food
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={food}
        columns={foodColums.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={row => row._id}
        checkboxSelection
      />
    </div>
  );
};

export default FoodTable;
