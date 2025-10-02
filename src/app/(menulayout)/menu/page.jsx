"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./components/RestaurantCard";
import RestaurantCardSkeleton from "./components/RestaurantCardSkeleton";
import ThaiFood from "./components/ThaiFood";
import ChineseFood from "./components/ChineseFood";
import IndianFood from "./components/IndianFood";
import ItalianFood from "./components/ItalianFood";
import JapaneseFood from "./components/JapaneseFood";
import KoreanFood from "./components/KoreanFood";
import TurkishFood from "./components/TurkishFood";



const MenuPage = () => {
 

  return (
    <div className="py-4">
    
      <ThaiFood/>
      <ChineseFood/>
      <IndianFood/>
      <ItalianFood/>
      <JapaneseFood/>
      <KoreanFood/>
      <TurkishFood/>
     
    </div>
  );
};

export default MenuPage;