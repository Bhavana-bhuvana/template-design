

import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroMessage from "./HeroMessage";
import config from "../config";

const Hero = ({ isAdmin = false }) => {
  const [hero, setHero] = useState(null);
  const [editingHero, setEditingHero] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
      console.log(`Here:${config.API_URL}`);
    axios
      .get(`${config.API_URL}/api/hero`)
      .then((res) => {
        console.log("Fetched hero data:", res.data);
        setHero(res.data);
        setEditingHero(res.data); // editable copy for admin
      })
      .catch((err) => console.error("Error fetching hero:", err));
  }, []);

  const handleImageLoad = () => {
    setLoaded(true);
    setTimeout(() => setShowText(true), 800);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${config.API_URL}/api/hero`, editingHero);
      setHero(res.data);
      setEditingHero(res.data);
      alert("Hero updated successfully!");
    } catch (err) {
      console.error("Error saving hero:", err);
      alert("Failed to update hero!");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${config.API_URL}/api/hero/upload-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update states with new image
      setEditingHero((prev) => ({ ...prev, backgroundImage: res.data.backgroundImage }));
      setHero((prev) => ({ ...prev, backgroundImage: res.data.backgroundImage }));
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Failed to upload image:", err);
      alert("Failed to upload image!");
    }
  };

  if (!hero || !editingHero) return <div>Loading...</div>;

  // Map lines for HeroMessage
  const linesFromState = [
    { text: editingHero.mealText || "Share a Meal", icon: editingHero.mealIcon || "FaUtensils" },
    { text: editingHero.smileText || "Share a Smile", icon: editingHero.smileIcon || "FaSmile" },
    { text: editingHero.handsText || "Join Hands to End Hunger", icon: editingHero.handsIcon || "FaHandsHelping" },
  ];

  const applyLinesToState = (updatedLines) => {
    setEditingHero((prev) => ({
      ...prev,
      mealText: updatedLines[0]?.text ?? prev.mealText,
      mealIcon: updatedLines[0]?.icon ?? prev.mealIcon,
      smileText: updatedLines[1]?.text ?? prev.smileText,
      smileIcon: updatedLines[1]?.icon ?? prev.smileIcon,
      handsText: updatedLines[2]?.text ?? prev.handsText,
      handsIcon: updatedLines[2]?.icon ?? prev.handsIcon,
    }));
  };
console.log("Hero backgroundImage to render:", hero.backgroundImage);
  return (
    <div id="home" className="relative min-h-screen font-primary flex justify-center items-center overflow-hidden">
      {/* Background image */}
      <img
        src={`${hero.backgroundImage}`}
        alt="hero background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0 scale-105"
        }`}
        onLoad={handleImageLoad}
      />

      <div className="absolute inset-0 bg-black/25"></div>

      <div
        className={`relative z-10 text-center transform transition-all duration-1000 ease-out ${
          showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } p-4 sm:p-10`}
        style={{ color: (isAdmin ? editingHero.textColor : hero.textColor) || "#4B3621" }}
      >
        {isAdmin ? (
          <>
            <input
              type="text"
              value={editingHero.title || ""}
              onChange={(e) => setEditingHero({ ...editingHero, title: e.target.value })}
              className="px-2 py-1 rounded text-black mb-2 w-full"
              placeholder="Hero Title"
            />
            <textarea
              value={editingHero.subtitle || ""}
              onChange={(e) => setEditingHero({ ...editingHero, subtitle: e.target.value })}
              className="px-2 py-1 rounded text-black mb-2 w-full"
              placeholder="Hero Subtitle"
            />

            {/* Image upload input */}
            <div className="my-2">
              <label className="block mb-1 text-white">Change Background Image:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight sm:leading-snug">
              {hero.title}
            </h1>
            <p className="mt-2 sm:mt-4 text-base sm:text-xl max-w-md sm:max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
          </>
        )}

        {/* HeroMessage */}
        <div className={`mt-4 sm:mt-6 transition-opacity duration-1000 ${showText ? "opacity-100" : "opacity-0"}`}>
          <HeroMessage
            isAdmin={isAdmin}
            lines={linesFromState}
            onChange={applyLinesToState}
          />
        </div>

        {isAdmin && (
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
