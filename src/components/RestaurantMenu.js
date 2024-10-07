import { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [isOpen, setIsOpen] = useState({
    section1: true,
    section2: true,
    section3: true,
  });

  const resInfo = useRestaurantMenu(resId);
  const onlineStatus = useOnlineStatus();

  if (onlineStatus) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">You are Offline</h1>
    );
  }

  if (!resInfo) {
    return <Shimmer />;
  }

  const {
    name,
    avgRatingString,
    costForTwoMessage,
    cuisines,
    cloudinaryImageId,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const recommendedMenuList =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards || [];

  const title2 =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      ?.title || "Second Menu Section";

  const subHeading2List =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      ?.itemCards || [];

  const toggleAccordion = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className=" p-5 max-w-screen-lg mx-auto">
      <div className=" mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {name || "Restaurant Name Not Available"}
        </h1>
        <p className="text-gray-600 mb-2">
          {cuisines?.join(", ") || "Cuisines Not Available"}
        </p>
        <div className=" flex justify-center gap-4">
          <span className="text-gray-600">
            {costForTwoMessage || "Cost for Two Not Available"}
          </span>
          <span className="text-yellow-500">
            {avgRatingString ? `${avgRatingString} ★` : "Rating Not Available"}
          </span>
        </div>
        {cloudinaryImageId && (
          <div className=" mt-4">
            <img
          
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
              alt={name || "Restaurant Image"}
              className="mx-auto w-20 h-20 max-w-lg object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* First Menu Section */}
      {recommendedMenuList?.length ? (
        <div className="menu-section mb-6">
          <div
            className="menu-header flex justify-between items-center bg-green-100 p-4 cursor-pointer"
            onClick={() => toggleAccordion("section1")}
          >
            <h3 className="text-xl font-bold">
              Recommended Menu ({recommendedMenuList.length})
            </h3>
            <span
              className={`menu-toggle ${isOpen.section1 ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </div>
          {isOpen.section1 && (
            <ul className="menu-items divide-y divide-gray-200">
              {recommendedMenuList.map((elem, index) => (
                <li
                  key={index}
                  className="menu-item p-4 flex justify-between items-center"
                >
                  <div className="menu-item-left">
                    <span className="font-medium">
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="block text-gray-500">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3 className="text-center">Recommended Menu Not Available</h3>
      )}

      {/* Second Menu Section */}
      {subHeading2List?.length ? (
        <div className="menu-section mb-6">
          <div
            className="menu-header flex justify-between items-center bg-green-100 p-4 cursor-pointer"
            onClick={() => toggleAccordion("section2")}
          >
            <h3 className="text-xl font-bold">
              {title2} ({subHeading2List.length})
            </h3>
            <span className={`e ${isOpen.section2 ? "rotate-180" : ""}`}>
              ▼
            </span>
          </div>
          {isOpen.section2 && (
            <ul className="menu-items divide-y divide-gray-200">
              {subHeading2List.map((elem, index) => (
                <li
                  key={index}
                  className="menu-item p-4 flex justify-between items-center"
                >
                  <div className="menu-item-left">
                    <span className="font-medium">
                      {elem?.card?.info?.name || "Item Name Not Available"}
                    </span>
                    <span className="block text-gray-500">
                      RS{" "}
                      {Math.floor(elem?.card?.info?.price / 100) ||
                        "Price Not Available"}
                    </span>
                  </div>
                  {elem?.card?.info?.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${elem?.card?.info?.imageId}`}
                      alt={elem?.card?.info?.name || "Image Not Available"}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3 className="text-center">Second Menu Section Not Available</h3>
      )}
    </div>
  );
};

export default RestaurantMenu;
