import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body = () => {
  // const [listOfRestaurants, setListOfRestaurants] = useState(resList);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [listOfFilterRestaurants, setListOfFilterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.51800&lng=88.38320&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);

    // console.log(
    //   json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    // );
    // json.
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setListOfFilterRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
   
  };


  // if (listOfRestaurants.length == 0) {
  //   return <Shimmer />;
  // }
 
  let totalOnlineRes = listOfFilterRestaurants.length;

  return listOfRestaurants == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            className="search-box"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const filteredData = listOfRestaurants.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              console.log(filteredData);
              // setListOfRestaurants(filteredData);
              setListOfFilterRestaurants(filteredData);
              setSearchText("");
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filterList = listOfRestaurants.filter(
              (elem) => elem.info.avgRatingString >= 4.5
            );
            setListOfFilterRestaurants(filterList);
            // console.log(filterList);
          }}
        >
          Rating 4.5 +
        </button>

        <p> Online Restaurant: {totalOnlineRes}</p>
      </div>
      <div className="restaurant-container">
        {listOfFilterRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            className="link"
            to={"rest/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
