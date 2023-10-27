import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { logout } from '../../store/auth';
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const isAdmin = useSelector((state) => state.auth.currentUser.isAdmin);
  const user = useSelector((state)=>state.auth.currentUser);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout button clicked");
    dispatch(logout());
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
        <Link to={"/user/" + user._id} style={{ textDecoration: "none" }}>
            <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
            </li>
          </Link>
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
          <p className="title">SERVICE</p>
          <Link to="/logs" style={{ textDecoration: "none" }}>
            <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
            </li>
          </Link>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
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
