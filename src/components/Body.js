import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);
  //   const tempData = [
  //     {
  //       info: {
  //         id: "383830",
  //         name: "KFC",
  //         cloudinaryImageId:
  //           "RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/1a170357-6a8a-4f7e-a1ca-18f56d041eb5_383830.JPG",
  //         locality: "Rajdanga Main Road",

  //         costForTwo: "₹400 for two",
  //         cuisines: ["Burgers", "Fast Food", "Rolls & Wraps"],

  //         parentId: "547",
  //         avgRatingString: "4.6",

  //         sla: {
  //           deliveryTime: 19,
  //         },
  //       },
  //     },
  //     {
  //       info: {
  //         id: "383831",
  //         name: "MCD",
  //         cloudinaryImageId:
  //           "RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/1a170357-6a8a-4f7e-a1ca-18f56d041eb5_383830.JPG",
  //         locality: "Rajdanga Main Road",

  //         costForTwo: "₹400 for two",
  //         cuisines: ["Burgers", "Fast Food", "Rolls & Wraps"],

  //         parentId: "547",
  //         avgRatingString: "3.2",

  //         sla: {
  //           deliveryTime: 19,
  //         },
  //       },
  //     },
  //     {
  //       info: {
  //         id: "383832",
  //         name: "Punjabi Dhaba",
  //         cloudinaryImageId:
  //           "RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/1a170357-6a8a-4f7e-a1ca-18f56d041eb5_383830.JPG",
  //         locality: "Rajdanga Main Road",

  //         costForTwo: "₹400 for two",
  //         cuisines: ["Burgers", "Fast Food", "Rolls & Wraps"],

  //         parentId: "547",
  //         avgRatingString: "4",

  //         sla: {
  //           deliveryTime: 19,
  //         },
  //       },
  //     },
  //   ];
  //   console.log(tempData);
  //   console.log(filterList);
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filterList = listOfRestaurants.filter(
              (elem) => elem.info.avgRatingString >= 4.5
            );
            setListOfRestaurants(filterList);
            console.log(filterList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="restaurant-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
