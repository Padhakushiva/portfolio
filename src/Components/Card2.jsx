import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Designer from "../assets/Designer.png";

const card2 = () => {
  return (
    <div className="grid place-content-center bg-gradient-to-br from-indigo-500 to-violet-500 p-4 text-slate-900 w-full h-auto min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-xl">
      <TiltCard />
    </div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = () => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-auto p-4 md:p-6 lg:p-8 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300 shadow-xl"
    >
      {/* Logo Section */}
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="flex items-center justify-center mb-4 md:mb-6 lg:mb-8 rounded-xl bg-white shadow-lg p-2 md:p-3 lg:p-4"
      >
        <img
          src={Designer}
          alt="logo"
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain rounded-lg"
          style={{ transform: "translateZ(56px)" }}
        />
      </div>

      {/* Content Section */}
      <div className="text-center md:text-left">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 md:mb-3 lg:mb-4 text-slate-900">
          Flavoura- Recipe manager App
        </h1>
        
        <p className="text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed md:leading-relaxed lg:leading-loose text-slate-800 mb-4 md:mb-5 lg:mb-6">
          This project addresses the issue of manual and unorganized data management that often leads to inefficiency and errors. It provides a modern solution by enabling real-time record updates with instant UI feedback, ensuring data persistence through a connected database, and offering a clean, responsive React interface.
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3 mb-4 md:mb-5 lg:mb-6 justify-center md:justify-start">
          <span className="px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 text-xs md:text-sm lg:text-base rounded-full bg-violet-200 text-slate-700 font-medium">
            HTML
          </span>
          <span className="px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 text-xs md:text-sm lg:text-base rounded-full bg-violet-200 text-slate-700 font-medium">
            CSS
          </span>
          <span className="px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 text-xs md:text-sm lg:text-base rounded-full bg-violet-200 text-slate-700 font-medium">
            JavaScript
          </span>
          <span className="px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 text-xs md:text-sm lg:text-base rounded-full bg-violet-200 text-slate-700 font-medium">
            React
          </span>
          <span className="px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 text-xs md:text-sm lg:text-base rounded-full bg-violet-200 text-slate-700 font-medium">
            MongoDB
          </span>
        </div>

        {/* Button */}
        <button 
          href="#" 
          className="w-full md:w-auto px-6 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 text-sm md:text-base lg:text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          style={{ "--clr": "#7808d0" }}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>
            Take a look
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default card2;