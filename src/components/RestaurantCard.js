import { CDN_URL } from "../utils/common";
const RestaurantCard = (props) => {
  //   console.log(props);

  const { resData } = props;
  // console.log(resData);
  const {
    name,
    cuisines,
    costForTwo,
    avgRatingString,
    deliveryTime,
    cloudinaryImageId,
  } = resData?.info;

  // ^ Above this we are destructure our data so the we do not have to write [*] multiple
  // time in our tags it will look good

  return (
    <div
      className="restaurant-card"
      style={{ backgroundColor: "#e0ffcd", padding: "10px" }}
    >
      <img
        className="restaurant-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="res-img"
      />
      {/* [*] */}
      <h3>{name}</h3>
      <h5>{cuisines.join(", ")}</h5>
      <h5>{costForTwo}</h5>
      <h5>{avgRatingString}star</h5>
      <h5>{deliveryTime} Minuets</h5>
    </div>
  );
};

export default RestaurantCard;
