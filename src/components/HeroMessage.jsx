import React from "react";
import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";

const HeroMessage = ({ isAdmin = false, lines = [], onChange }) => {
  const iconOptions = [
    { name: "Utensils", value: "FaUtensils" },
    { name: "Smile", value: "FaSmile" },
    { name: "Handshake", value: "FaHandsHelping" },
    { name: "Heart", value: "FaHeart" },
    { name: "Apple", value: "FaAppleAlt" },
    { name: "Leaf", value: "FaLeaf" },
    { name: "Gift", value: "FaGift" },
    { name: "Star", value: "FaStar" },
  ];

  const renderIcon = (iconName, size = 18, color = "text-yellow-200") => {
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent className={color} size={size} /> : null;
  };

  const safeLines =
    lines?.length
      ? lines
      : [
          { text: "Share a Meal", icon: "FaUtensils" },
          { text: "Share a Smile", icon: "FaSmile" },
          { text: "Join Hands to End Hunger", icon: "FaHandsHelping" },
        ];

  const handleChange = (idx, field, value) => {
    if (!onChange) return;
    const updated = safeLines.map((l, i) =>
      i === idx ? { ...l, [field]: value } : l
    );
    onChange(updated);
  };

  return (
    <motion.div
      className="relative z-30 flex flex-col items-center justify-center bg-black/50 p-3 sm:p-4 md:p-5 rounded-xl text-center space-y-3 max-w-[18rem] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
    >
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-lg">
        FEED THE HUNGER
      </h3>

      {safeLines.map((line, idx) => (
        <p
          key={idx}
          className="text-white drop-shadow-md flex flex-col sm:flex-row sm:items-center sm:space-x-1 items-center space-y-1 sm:space-y-0 text-sm sm:text-base"
        >
          {isAdmin ? (
            <>
              <input
                value={line.text}
                onChange={(e) => handleChange(idx, "text", e.target.value)}
                className="px-1 py-1 rounded text-black text-xs sm:text-sm w-full sm:w-auto"
              />
              <select
                value={line.icon}
                onChange={(e) => handleChange(idx, "icon", e.target.value)}
                className="ml-0 sm:ml-1 px-1 py-1 rounded text-black text-xs sm:text-sm"
              >
                {iconOptions.map((icon) => (
                  <option key={icon.value} value={icon.value}>
                    {icon.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <span className="text-xs sm:text-sm md:text-base">{line.text}</span>
              {renderIcon(line.icon, 18)}
            </>
          )}
        </p>
      ))}
    </motion.div>
  );
};

export default HeroMessage;



