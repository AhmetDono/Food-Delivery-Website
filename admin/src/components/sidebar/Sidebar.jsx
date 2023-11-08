import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { logout } from '../../store/auth';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state)=>state.auth.currentUser);
  const isAdmin = user?.isAdmin; // Use optional chaining here
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout button clicked");
    dispatch(logout());
    navigate("/login");
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">lamadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
        <p className="title">USER</p>
        {user ? (
            <Link to={"/user/" + user._id} style={{ textDecoration: "none" }}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Profile</span>
              </li>
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Login</span>
              </li>
            </Link>
          )}

          {isAdmin && (
              <>
          <p className="title">MAIN</p>
          <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/foods" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Food</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
            </li>
          </Link>
          </>
            )}
          <p className="title">LOGOUT</p>
          <button  onClick={(e)=>handleLogout(e)} style={{ background: 'none', border: 'none' }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
