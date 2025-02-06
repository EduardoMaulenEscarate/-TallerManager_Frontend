import { useEffect, useRef } from "react";
import gsap from "gsap";

const About = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    // GSAP Animation
    gsap.fromTo(
      boxRef.current, 
      { opacity: 0, x: -100 }, 
      { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div 
        ref={boxRef} 
        style={{ width: "150px", height: "150px", backgroundColor: "tomato", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" }}
      >
        ¡Hola GSAP!
      </div>
    </div>
  );
};

export default About;