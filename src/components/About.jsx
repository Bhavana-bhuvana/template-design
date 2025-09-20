// About.jsx
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 }); // triggers when 50% visible
  const controlsImage = useAnimation();
  const controlsText = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Play animation when in view
      controlsImage.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1, ease: "easeInOut" },
      });
      controlsText.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1, ease: "easeInOut", delay: 0.2 },
      });
    } else {
      // Reset when out of view (so it plays again if you click navbar)
      controlsImage.set({ x: "-100%", opacity: 0 });
      controlsText.set({ x: "100%", opacity: 0 });
    }
  }, [isInView, controlsImage, controlsText]);

  return (
    <div
      id="about"
      ref={ref}
      className="min-h-screen bg-heroBG flex flex-col md:flex-row items-center justify-center px-6 md:px-16"
    >
      {/* Image */}
      <motion.img
        src="img7.jpg"
        alt="About us"
        className="w-full md:w-1/2 rounded-xl shadow-lg mb-6 md:mb-0"
        initial={{ x: "-100%", opacity: 0 }}
        animate={controlsImage}
      />

      {/* Text */}
      <motion.div
        className="w-full md:w-1/2 md:pl-12 text-center md:text-left"
        initial={{ x: "100%", opacity: 0 }}
        animate={controlsText}
      >
        <h2 className="text-2xl md:text-4xl text-white font-bold mb-4">About Us</h2>
        <p className="text-base text-white md:text-lg leading-relaxed">
          We are passionate about delivering the best services to our customers.
          Our mission is to create solutions that are not only efficient but
          also user-friendly. With a dedicated team and years of experience, we
          strive to make a difference in every project we take on.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
