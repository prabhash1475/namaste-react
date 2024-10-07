import { CDN_URL } from "../utils/common";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    name,
    cuisines,
    costForTwo,
    avgRatingString,
    sla,
    cloudinaryImageId,
  } = resData?.info;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-64 mx-auto hover:shadow-2xl hover:bg-orange-200 transition-shadow duration-300">
      <img
        className="w-full h-40 object-cover rounded-md"
        src={CDN_URL + cloudinaryImageId}
        alt={name}
      />
      <h3 className="text-lg font-semibold mt-3">{name}</h3>
      <h5 className="text-sm text-gray-600 mt-1">{cuisines.join(", ")}</h5>

      <div className="flex justify-between items-center mt-2">
        <h5 className="text-sm text-gray-700">{costForTwo}</h5>
        <h5 className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm">
          {avgRatingString} ★
        </h5>
      </div>

      <h5 className="text-right text-sm text-gray-500 mt-2">{sla.slaString}</h5>
    </div>
  );
};

export default RestaurantCard;
