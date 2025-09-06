// src/features/about/aboutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hero: {
    title: "About Our Fashion Store",
    subtitle: "Bringing you the latest trends with quality you can trust.",
  },
  story: {
    title: "Our Story",
    text: "Founded in 2025, our store aims to blend style with comfort. We curate clothing and accessories that are trendy, sustainable, and affordable. Our mission is to make fashion accessible for everyone while promoting ethical practices and quality craftsmanship.",
    image: "https://aureatelabs.com/wp-content/uploads/2022/11/31-eCommerce-Website-Pages-List_-Must-Have-Pages-Elements-With-Examples-1536x491.jpg",
  },
  mission: {
    title: "Our Mission",
    text: "To empower our customers to express themselves through fashion without compromising on quality or sustainability.",
  },
  vision: {
    title: "Our Vision",
    text: "To become a leading fashion destination recognized for style, innovation, and ethical responsibility.",
  },
  cta: {
    title: "Join Us On Our Journey",
    text: "Explore the latest collection and find your perfect style today!",
    buttonText: "Shop Now",
    buttonLink: "/",
  },
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    // You can add reducers here later if you want to update content dynamically
  },
});

export default aboutSlice.reducer;
