import React from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

export const restaurants = [
  {
    id: "rest_001",
    slug: "kacchi-bhai-dhanmondi",
    name: "Kacchi Bhai",
    logo: "https://i.ibb.co.com/1YFN5k3C/kacchi-bhai-2-logo.png",
    banner:
      "https://i.ibb.co.com/mCVYhy44/177534213-311121510627014-6362311441237242299-n.jpg",
    rating: 4.6,
    reviewsCount: 128,
    cuisines: ["Bengali", "Biriyani"],
    priceRange: "৳৳",
    estimatedDeliveryTime: "30-40 min",
    deliveryFee: 30,
    status: "approved",
    isFeatured: true,
    isActive: true,
    approved: true,
    ownerId: "user_rest_01",
    ownerEmail: "xyz@gmail.com",
    location: {
      address: "House 12/A, Road 5, Dhanmondi",
      area: "Dhanmondi",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: { lat: 23.7465, lng: 90.376 },
    },
    contact: {
      phone: "01710000001",
      email: "info@kacchibhai.bd",
    },

    tags: ["Popular", "Family"],
    createdAt: "2025-03-10T09:30:00Z",
    updatedAt: "2025-09-10T12:00:00Z",
  },

  {
    id: "rest_002",
    slug: "pizza-point-gulshan",
    name: "Pizza Point",
    logo: "https://i.ibb.co.com/WWxNbFgt/pizza-point-3.png",
    banner:
      "https://i.ibb.co.com/Ps520SVK/ba4249fb-fde9-4acf-8352-b158850379f9.jpg",
    rating: 4.3,
    reviewsCount: 89,
    cuisines: ["Italian", "Fast Food"],
    priceRange: "৳৳৳",
    estimatedDeliveryTime: "25-35 min",
    deliveryFee: 40,
    status: "approved",
    isFeatured: false,
    isActive: true,
    approved: true,
    ownerId: "user_rest_02",
    ownerEmail: "afroza@gmail.com",
    location: {
      address: "House 5, Road 11, Gulshan-2",
      area: "Gulshan",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: { lat: 23.7925, lng: 90.4078 },
    },
    contact: {
      phone: "01710000002",
      email: "hello@pizzapoint.bd",
    },

    tags: ["Fast Delivery", "Hot"],
    createdAt: "2024-11-20T08:15:00Z",
    updatedAt: "2025-09-05T10:00:00Z",
  },

  {
    id: "rest_003",
    slug: "banani-bites",
    name: "Banani Bites",
    logo: "https://i.ibb.co.com/7t409KqN/banani-bites-logo.png",
    banner:
      "https://i.ibb.co.com/0RcNNC9q/Rolla-Sharjah-restaurants-021120.jpg",
    rating: 4.8,
    reviewsCount: 204,
    cuisines: ["Dessert", "Cafe"],
    priceRange: "৳",
    estimatedDeliveryTime: "15-25 min",
    deliveryFee: 0,
    status: "approved",
    isFeatured: true,
    isActive: true,
    approved: true,
    ownerId: "user_rest_03",
    ownerEmail: "nipa@gmail.com",
    location: {
      address: "Road 2, Banani",
      area: "Banani",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: { lat: 23.7929, lng: 90.41 },
    },
    contact: {
      phone: "01710000003",
      email: "contact@bananibites.bd",
    },

    tags: ["Quick", "Low Price"],
    createdAt: "2025-01-05T11:20:00Z",
    updatedAt: "2025-09-12T09:45:00Z",
  },
  {
    id: "rest_004",
    slug: "burger-hub-mirpur",
    name: "Burger Hub",
    logo: "https://i.ibb.co.com/tpHtwyVq/burger-hub-logo.png",
    banner:
      "https://i.ibb.co.com/wZsXm631/774f65184299217-Y3-Jvc-Cwx-MDgw-LDg0-NCww-LDEx-Nw.jpg",
    rating: 4.5,
    reviewsCount: 175,
    cuisines: ["Fast Food", "Burgers"],
    priceRange: "৳৳",
    estimatedDeliveryTime: "20-30 min",
    deliveryFee: 25,
    status: "approved",
    isFeatured: true,
    isActive: true,
    approved: true,
    ownerId: "user_rest_04",
    ownerEmail: "julkarnain@gmail.com",
    location: {
      address: "Block B, Section 11, Mirpur",
      area: "Mirpur",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: { lat: 23.8151, lng: 90.3666 },
    },
    contact: {
      phone: "01710000004",
      email: "support@burgerhub.bd",
    },

    tags: ["Popular", "Spicy"],
    createdAt: "2024-12-10T10:30:00Z",
    updatedAt: "2025-09-15T08:20:00Z",
  },

  {
    id: "rest_005",
    slug: "thai-treats-uttara",
    name: "Time for Thai",
    logo: "https://i.ibb.co.com/Z1LxGTdk/time-for-thai-logo.png",
    banner: "https://i.ibb.co.com/mF5BspK7/timeforthai-mobile.jpg",
    rating: 4.4,
    reviewsCount: 143,
    cuisines: ["Thai", "Asian"],
    priceRange: "৳৳৳",
    estimatedDeliveryTime: "35-45 min",
    deliveryFee: 50,
    status: "approved",
    isFeatured: false,
    isActive: true,
    approved: true,
    ownerId: "user_rest_05",
    ownerEmail: "jerin@gmail.com",
    location: {
      address: "Sector 9, Uttara",
      area: "Uttara",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: { lat: 23.8767, lng: 90.3796 },
    },
    contact: {
      phone: "01710000005",
      email: "info@thaitreats.bd",
    },

    tags: ["Authentic", "Spicy"],
    createdAt: "2025-02-15T09:45:00Z",
    updatedAt: "2025-09-11T11:10:00Z",
  },

  {
    id: "rest_006",
    slug: "kebab-korner-bashundhara",
    name: "Kebab Korner",
    logo: "https://i.ibb.co.com/m5Dyyhr1/kebab-korner-logo.png",
    banner: "https://i.ibb.co.com/GwK6xFc/1663654013-Bg-stevenage.webp",
    rating: 4.2,
    reviewsCount: 97,
    cuisines: ["Middle Eastern", "Grill"],
    priceRange: "৳৳",
    estimatedDeliveryTime: "25-35 min",
    deliveryFee: 30,
    status: "approved",
    isFeatured: false,
    isActive: true,
    approved: true,
    ownerId: "user_rest_06",
    ownerEmail: "imran@gmail.com",
    location: {
      address: "Block C, Bashundhara R/A",
      area: "Bashundhara",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: { lat: 23.8155, lng: 90.4281 },
    },
    contact: {
      phone: "01710000006",
      email: "order@kebabkorner.bd",
    },

    tags: ["Grill", "Halal"],
    createdAt: "2025-03-01T08:30:00Z",
    updatedAt: "2025-09-09T12:25:00Z",
  },

  {
    id: "rest_007",
    slug: "sushi-senpai-banani",
    name: "Sushi Senpai",
    logo: "https://i.ibb.co.com/pBsFLPkd/sushi-senpai-logo.png",
    banner:
      "https://i.ibb.co.com/HLyBLcxY/f4710469-8ac4-40dc-a1d0-f6982ca651f8-1.webp",
    rating: 4.7,
    reviewsCount: 155,
    cuisines: ["Japanese", "Sushi"],
    priceRange: "৳৳৳৳",
    estimatedDeliveryTime: "40-50 min",
    deliveryFee: 60,
    status: "rejected",
    isFeatured: true,
    isActive: true,
    approved: true,
    ownerId: "user_rest_07",
    ownerEmail: "kanak@gmail.com",
    location: {
      address: "House 20, Road 12, Banani",
      area: "Banani",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: { lat: 23.7937, lng: 90.4041 },
    },
    contact: {
      phone: "01710000007",
      email: "contact@sushisenpai.bd",
    },

    tags: ["Premium", "Authentic"],
    createdAt: "2025-04-12T09:15:00Z",
    updatedAt: "2025-09-14T11:00:00Z",
  },

  {
    id: "rest_008",
    slug: "roll-express-mohakhali",
    name: "Roll Express",
    logo: "https://i.ibb.co.com/PG8Y7wnm/roll-express-logo.png",
    banner:
      "https://i.ibb.co.com/7JFR57nd/roll-express-chandigarh-sector-36d-chandigarh-fast-food-19mf5tu46g.jpg",
    rating: 4.1,
    reviewsCount: 110,
    cuisines: ["Street Food", "Rolls"],
    priceRange: "৳",
    estimatedDeliveryTime: "15-20 min",
    deliveryFee: 20,
    status: "pending",
    isFeatured: false,
    isActive: false,
    approved: true,
    ownerId: "user_rest_08",
    ownerEmail: "mustakim@gmail.com",
    location: {
      address: "Mohakhali DOHS Gate",
      area: "Mohakhali",
      city: "Dhaka",
      country: "Bangladesh",
      coordinates: { lat: 23.7805, lng: 90.3982 },
    },
    contact: {
      phone: "01710000008",
      email: "order@rollexpress.bd",
    },

    tags: ["Quick", "Budget"],
    createdAt: "2025-03-20T07:50:00Z",
    updatedAt: "2025-09-16T12:40:00Z",
  },
];

export default function ManageRestaurants() {
  return (
    <div className="container mx-auto text-gray-700 dark:text-gray-300">
      {" "}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table ">
          {/* head */}
          <thead className="bg-gray-100 dark:bg-gray-800  ">
            <tr
              className="text-gray-700 dark:text-gray-300
            text-left "
            >
              <th className="px-4">#</th>
              <th className="px-4">Restaurant Logo</th>
              <th className="px-4">Restaurant Name</th>
              <th className="px-4">Owner Email</th>
              <th className="px-4">Status</th>
              <th className="px-4">Active</th>
              <th className="px-4 text-center w-[150px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {restaurants.map((restaurant, index) => (
              <tr
                key={restaurant.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-950"
              >
                <th className="px-4">{index + 1}</th>
                <th className="px-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={restaurant.logo}
                    alt="logo"
                  />
                </th>
                <td className="px-4 font-medium">{restaurant.name}</td>
                <td className="px-4">{restaurant.ownerEmail}</td>
                <td className="px-4">
                  {restaurant.status === "approved" ? (
                    <span className="text-green-500 border dark:border-none font-semibold bg-green-50 py-1 px-2 rounded-full">
                      Approved
                    </span>
                  ) : restaurant.status === "rejected" ? (
                    <span className="text-red-500 border dark:border-none  font-semibold bg-red-50 py-1 px-2 rounded-full">
                      Rejected
                    </span>
                  ) : (
                    <span className="text-yellow-500  border  dark:border-none  font-semibold bg-yellow-50 py-1 px-2 rounded-full">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4">
                  {restaurant.isActive === true ? (
                    <span className="text-green-400 font-medium">Active</span>
                  ) : (
                    <span className="text-red-400 font-medium">Inactive</span>
                  )}
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-2 ">
                    <button
                      className="btn  
                    btn-sm rounded-full border dark:border-none border-orange-500 flex items-center gap-1 bg-orange-50   text-orange-500 hover:text-white hover:bg-orange-400"
                    >
                      <AiOutlineEye size={16} /> View
                    </button>
                    <button className="btn btn-sm rounded-full border dark:border-none border-green-500 text-green-500 hover:bg-green-400 hover:text-white  flex items-center gap-1">
                      <AiOutlineCheck size={16} /> Approve
                    </button>
                    <button className="btn btn-sm rounded-full bg-red-50 border dark:border-none border-red-500 text-red-500 hover:bg-red-400 hover:text-white flex items-center gap-1">
                      <AiOutlineClose size={16} /> Reject
                    </button>
                    <button
                      className="btn btn-sm rounded-full flex items-center gap-1 bg-gray-100
  border dark:border-none border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white   "
                    >
                      <MdDeleteOutline size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
