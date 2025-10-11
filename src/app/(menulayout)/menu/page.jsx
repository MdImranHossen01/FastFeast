"use client";
import React, { useState, useEffect } from "react";
import ThaiFood from "./components/ThaiFood";
import ChineseFood from "./components/ChineseFood";
import IndianFood from "./components/IndianFood";
import ItalianFood from "./components/ItalianFood";
import JapaneseFood from "./components/JapaneseFood";
import KoreanFood from "./components/KoreanFood";
import TurkishFood from "./components/TurkishFood";
import getMenu from "@/app/actions/menu/getMenu";
import getRestaurant from "@/app/actions/restaurant/getRestaurant";

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both menus and restaurants data
        const [menusData, restaurantsData] = await Promise.all([
          getMenu(),
          getRestaurant()
        ]);
        
        setMenus(menusData);
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-4">
      <ThaiFood menus={menus} restaurants={restaurants} loading={loading} />
      <ChineseFood menus={menus} restaurants={restaurants} loading={loading} />
      <IndianFood menus={menus} restaurants={restaurants} loading={loading} />
      <ItalianFood menus={menus} restaurants={restaurants} loading={loading} />
      <JapaneseFood menus={menus} restaurants={restaurants} loading={loading} />
      <KoreanFood menus={menus} restaurants={restaurants} loading={loading} />
      <TurkishFood menus={menus} restaurants={restaurants} loading={loading} />
    </div>
  );
};

export default MenuPage;