import { LOGO_URL } from "../utils/common";
const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src={LOGO_URL}
          // src="https://i.ibb.co/WH8SsCj/Screenshot-2024-09-29-053226.png"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>Contact Us</li>
          <li>Social</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
