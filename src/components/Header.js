import { useState } from "react";
import { LOGO_URL } from "../utils/common";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img
            className="logo"
            src={LOGO_URL}
            // src="https://i.ibb.co/WH8SsCj/Screenshot-2024-09-29-053226.png"
          />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>{onlineStatus ? "Offline: 🔴" : "Online: 🟢"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>
            <Link to="/rest:resId">
              <img
                style={{ width: "25px" }}
                src="https://www.i2clipart.com/cliparts/f/b/e/5/clipart-heart-fbe5.png"
              />
            </Link>
          </li>
        </ul>
        <button
          className="login-btn"
          onClick={() => {
            btnName == "Login" ? setBtnName("Logout") : setBtnName("Login");
          }}
        >
          {btnName}
        </button>
      </div>
    </div>
  );
};
export default Header;
