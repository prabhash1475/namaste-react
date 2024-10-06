// import { useState, useEffect } from "react";
// import Shimmer from "./Shimmer";
// import { useParams } from "react-router-dom";
// import { MENU_API_KFC } from "../utils/common";

// const RestaurantMenu = () => {
//   const [resInfo, setResInfo] = useState(null);
//   const { resId } = useParams();
//   // resId is an object so we have to destructure on the fly

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   const fetchMenu = async () => {
//     const data = await fetch(
//       MENU_API_KFC + resId
//       //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=920809&catalog_qa=undefined&submitAction=ENTER"
//       //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=920809&catalog_qa=undefined&submitAction=ENTER" //KFC OLD
//       //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=460653&catalog_qa=undefined&submitAction=ENTER"
//       //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=430964&catalog_qa=undefined&submitAction=ENTER" // pzza hut
//     );
//     const json = await data.json();

//     setResInfo(json?.data);
//   };

//   //   showing shimmer UI if restaurant info in null
//   if (resInfo == null) {
//     return <Shimmer />;
//   }

// let {
//   name,
//   avgRatingString,
//   costForTwoMessage,
//   cloudinaryImageId,
//   cuisines,
// } = resInfo?.cards[2]?.card?.card?.info;
// console.log(cuisines.join(","));
// console.log(
//   resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
//     ?.itemCards
// );

//   //   let recommendedMenu =
//   //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
//   //       ?.itemCards[1]?.card?.info?.name;

//   let title =
//     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
//       ?.title;

//   //   console.log(recommendedMenu.title);

//   let recommendedMenuList =
//     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
//       ?.itemCards;

//   let title2 =
//     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
//       ?.title;
//   let subHeading2List =
//     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
//       ?.itemCards;

//   return (
//     <div className="menu">
//       <div style={{ textTransform: "uppercase" }}>
//         <h1>{name}</h1>
//         <p>{cuisines.join(", ")}</p>
//         <p>{costForTwoMessage}</p>
//         <p>{avgRatingString} ★</p>
//       </div>

//       <h2>Cuisines</h2>
//       <ul>
//         {cuisines.map((elem, index) => (
//           <li key={index}>{elem}</li>
//         ))}
//       </ul>
//       <h3>
//         {title} ({recommendedMenuList.length})
//       </h3>

//       <ul>
//         {recommendedMenuList.map((elem, index) => (
//           <li key={index}>
//             {elem?.card?.info?.name} - RS{" "}
//             {Math.floor(elem?.card?.info?.price / 100)}
//           </li>
//         ))}
//       </ul>
//       <h3>{title2}</h3>

//       <ul>
//         {subHeading2List.map((elem) => (
//           <li key={elem?.card?.info?.id}>
//             {elem?.card?.info?.name} - RS{" "}
//             {Math.floor(elem?.card?.info?.price / 100)}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantMenu;

// -------------------import { useState, useEffect } from "react";import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link, useParams } from "react-router-dom";
import { MENU_API_KFC } from "../utils/common";
import { useState, useEffect } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  const [isOpen, setIsOpen] = useState({
    section1: true, // Initially open the first section
    section2: true, // Initially open the second section
    section3: true, // Initially open the third section
  });
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  const onlineStatus = useOnlineStatus();

  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  // const fetchMenu = async () => {
  //   const data = await fetch(MENU_API_KFC + resId);
  //   const json = await data.json();
  //   setResInfo(json?.data);
  // };
  if (onlineStatus) {
    return <h1>You are Offline</h1>;
  }
  if (resInfo == null) {
    return <Shimmer />;
  }

  const {
    name,
    avgRatingString,
    costForTwoMessage,
    cuisines,
    cloudinaryImageId,
  } = resInfo?.cards[2]?.card?.card?.info || {}; // Fallback to empty object if undefined

  const title =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.title || "Recommended Menu";
  const recommendedMenuList =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards || []; // Fallback to an empty array if undefined

  const title2 =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      ?.title || "Second Menu Section";
  const subHeading2List =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      ?.itemCards || []; // Fallback to an empty array if undefined

  const title3 =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card
      ?.title || "Third Menu Section";
  const subHeading3List =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card
      ?.itemCards || []; // Fallback to an empty array if undefined

  // Function to toggle the accordion sections
  const toggleAccordion = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="menu-container">
      <div className="restaurant-details">
        <h1 className="restaurant-name">
          {name || "Restaurant Name Not Available"}
        </h1>
        <p className="restaurant-cuisines">
          {cuisines?.join(", ") || "Cuisines Not Available"}
        </p>
        <div className="restaurant-meta">
          <span className="restaurant-cost">
            {costForTwoMessage || "Cost for Two Not Available"}
          </span>
          <span className="restaurant-rating">
            {avgRatingString ? `${avgRatingString} ★` : "Rating Not Available"}
          </span>
        </div>
      </div>

      {/* First Menu Section */}
      {recommendedMenuList?.length ? (
        <div className="menu-section">
          <div
            className="menu-header"
            onClick={() => toggleAccordion("section1")}
          >
            <h3>
              {title} ({recommendedMenuList.length})
            </h3>
            <span
              className={`menu-toggle ${isOpen.section1 ? "open" : ""}`}
            ></span>
          </div>
          {isOpen.section1 && (
            <ul className="menu-items">
              {recommendedMenuList.map((elem, index) => (
                <li key={index} className="menu-item">
                  <div className="menu-item-left">
                    <span>
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="menu-price">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="menu-dish-image"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3>Recommended Menu Not Available</h3>
      )}

      {/* Second Menu Section */}
      {subHeading2List?.length ? (
        <div className="menu-section">
          <div
            className="menu-header"
            onClick={() => toggleAccordion("section2")}
          >
            <h3>
              {title2} ({subHeading2List.length})
            </h3>
            <span
              className={`menu-toggle ${isOpen.section2 ? "open" : ""}`}
            ></span>
          </div>
          {isOpen.section2 && (
            <ul className="menu-items">
              {subHeading2List.map((elem, index) => (
                <li key={index} className="menu-item">
                  <div className="menu-item-left">
                    <span>
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="menu-price">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="menu-dish-image"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3>Second Menu Section Not Available</h3>
      )}

      {/* Third Menu Section */}
      {subHeading3List?.length ? (
        <div className="menu-section">
          <div
            className="menu-header"
            onClick={() => toggleAccordion("section3")}
          >
            <h3>
              {title3} ({subHeading3List.length})
            </h3>
            <span
              className={`menu-toggle ${isOpen.section3 ? "open" : ""}`}
            ></span>
          </div>
          {isOpen.section3 && (
            <ul className="menu-items">
              {subHeading3List.map((elem, index) => (
                <li key={index} className="menu-item">
                  <div className="menu-item-left">
                    <span>
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="menu-price">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="menu-dish-image"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3>Third Menu Section Not Available</h3>
      )}
    </div>
  );
};

export default RestaurantMenu;
