import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API_KFC } from "../utils/common";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  // resId is an object so we have to destructure on the fly

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      MENU_API_KFC + resId
      //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=920809&catalog_qa=undefined&submitAction=ENTER"
      //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=920809&catalog_qa=undefined&submitAction=ENTER" //KFC OLD
      //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=460653&catalog_qa=undefined&submitAction=ENTER"
      //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=430964&catalog_qa=undefined&submitAction=ENTER" // pzza hut
    );
    const json = await data.json();

    setResInfo(json?.data);
  };

  //   showing shimmer UI if restaurant info in null
  if (resInfo == null) {
    return <Shimmer />;
  }

  let {
    name,
    avgRatingString,
    costForTwoMessage,
    cloudinaryImageId,
    cuisines,
  } = resInfo?.cards[2]?.card?.card?.info;
  console.log(cuisines.join(","));
  console.log(
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards
  );

  //   let recommendedMenu =
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
  //       ?.itemCards[1]?.card?.info?.name;

  let title =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.title;

  //   console.log(recommendedMenu.title);

  let recommendedMenuList =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards;

  let title2 =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      ?.title;
  let subHeading2List =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      ?.itemCards;

  return (
    <div className="menu">
      <div style={{ textTransform: "uppercase" }}>
        <h1>{name}</h1>
        <p>{cuisines.join(", ")}</p>
        <p>{costForTwoMessage}</p>
        <p>{avgRatingString} ★</p>
      </div>

      <h2>Cuisines</h2>
      <ul>
        {cuisines.map((elem, index) => (
          <li key={index}>{elem}</li>
        ))}
      </ul>
      <h3>
        {title} ({recommendedMenuList.length})
      </h3>

      <ul>
        {recommendedMenuList.map((elem, index) => (
          <li key={index}>
            {elem?.card?.info?.name} - RS{" "}
            {Math.floor(elem?.card?.info?.price / 100)}
          </li>
        ))}
      </ul>
      <h3>{title2}</h3>

      <ul>
        {subHeading2List.map((elem) => (
          <li key={elem?.card?.info?.id}>
            {elem?.card?.info?.name} - RS{" "}
            {Math.floor(elem?.card?.info?.price / 100)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
