import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const restaurantId = useParams();
  console.log(restaurantId);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=920809&catalog_qa=undefined&submitAction=ENTER" //KFC

      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=430964&catalog_qa=undefined&submitAction=ENTER" // pzza hut
    );
    const json = await data.json();
    setResInfo(json?.data);

    // console.log(json?.data?.cards[2]?.card?.card?.info);

    // console.log(resInfo?.cards[2]?.card?.card?.info);

    // let { name } = resInfo?.cards[2]?.card?.card?.info;
    // console.log(name);
  };
  //   console.log(resInfo);

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

  //   console.log(
  //     name,
  //     avgRatingString,
  //     cloudinaryImageId,
  //     cuisines,
  //     costForTwoMessage
  //   );

  let recommendedMenu =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.itemCards[1]?.card?.info?.name;

  let recommendedMenuList =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.itemCards;

  // resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  console.log(recommendedMenu);
  let subHeading =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  let subHeading2 =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  let subHeading2List =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards;

  return (
    <div className="menu">
      <div>
        <h1>{name}</h1>
        <p>{cuisines}</p>
        <p>{costForTwoMessage}</p>
        <p>{avgRatingString}</p>
      </div>

      <h2>Menu</h2>
      <ul>
        {cuisines.map((elem, index) => (
          <li key={index}>{elem}</li>
        ))}
      </ul>
      <h3>{subHeading.title}</h3>
      <ul>
        {recommendedMenuList.map((elem, index) => (
          <li key={index}>
            {elem?.card?.info?.name} - RS{" "}
            {Math.floor(elem?.card?.info?.price / 100)}
          </li>
        ))}
      </ul>
      <h3>{subHeading2.title}</h3>
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
