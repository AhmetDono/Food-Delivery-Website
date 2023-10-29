import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from "../../store/apiCalls";

const EditProfile = ({ inputs, title }) => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const User = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );

  const showSuccessToast = () => {
    toast.success("Kullanici basariyla guncellendi!", {
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
  const showErrorToast = () => {
    toast.success("Kullanici Guncellenemdi Bir Hata Olustu!", {
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

  const [file, setFile] = useState(null);
  const [input, setInput] = useState({});
  const [address, setAddress] = useState({});
  const dispacth = useDispatch();

  const handleChange = (e) => {
      // Check if the name is one of the address fields
      if (['city', 'streetAddress', 'postalCode'].includes(e.target.name)) {
        setAddress((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      } else {
        setInput((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
    };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        showErrorToast()
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const updatedInfo = {...input,img:downloadURL,address:address};
          updateUser(dispacth,updatedInfo,userId)
          showSuccessToast();
          setFile(null);
          setInput({});
          setAddress({})
        });
      }
    );
  }

    console.log(input,address,file,userId)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                    <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button onClick={handleClick} >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
