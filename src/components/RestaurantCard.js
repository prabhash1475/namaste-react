import { CDN_URL } from "../utils/common";
const RestaurantCard = (props) => {
  //   console.log(props);

  const { resData } = props;
  //   deliveryTime is not working
  //   console.log(resData?.info.sla.deliveryTime);
  const {
    name,
    cuisines,
    costForTwo,
    avgRatingString,
    sla,
    deliveryTime,
    cloudinaryImageId,
  } = resData?.info;

  // ^ Above this we are destructure our data so the we do not have to write [*] multiple
  // time in our tags it will look good

  return (
    <div className="restaurant-card">
      <img
        className="restaurant-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="res-img"
      />
      {/* [*] */}
      <h3>{name}</h3>
      <h5 className="cuisines">{cuisines.join(", ")}</h5>
      <div className="flex">
        <h5>{costForTwo}</h5>
        <h5
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "6px",
            borderRadius: "10%",
          }}
        >
          {avgRatingString} ★
        </h5>
      </div>

      <h5 style={{ textAlign: "end" }}>{sla.slaString} </h5>
    </div>
  );
};

export default RestaurantCard;
