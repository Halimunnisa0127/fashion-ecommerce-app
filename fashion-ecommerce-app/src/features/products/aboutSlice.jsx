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
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=800&q=80",
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
