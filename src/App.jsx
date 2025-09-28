import React from "react";
import Mainroutes from "./Routes/Mainroutes";
import AnimatedStarsBackground from "./Components/AnimatedStarsBackground";


const App = () => {
  return (
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        <AnimatedStarsBackground 
          starCount={150}
          starSizes={[1, 1.5, 2, 2.5]}
          colors={['#ffffff', '#e5e7eb', '#d1d5db', '#9ca3af', '#f3f4f6', '#60a5fa', '#a78bfa']}
          twinkleSpeed={0.4}
        />
        <Mainroutes />
      </div>
  );
};

export default App;
