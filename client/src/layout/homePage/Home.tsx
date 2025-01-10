import React, { useEffect, useRef } from "react";

export const Home = () => {
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let vantaEffect: any;

    const loadScripts = async () => {
      try {
        // Load Three.js
        const threeScript = document.createElement("script");
        threeScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        threeScript.async = true;
        document.body.appendChild(threeScript);

        // Wait for Three.js to load
        await new Promise((resolve) => {
          threeScript.onload = resolve;
        });

        // Load Vanta GLOBE
        const vantaScript = document.createElement("script");
        vantaScript.src =
          "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.globe.min.js";
        vantaScript.async = true;
        document.body.appendChild(vantaScript);

        // Wait for Vanta GLOBE to load
        await new Promise((resolve) => {
          vantaScript.onload = resolve;
        });

        // Initialize Vanta GLOBE
        if (backgroundRef.current && (window as any).VANTA) {
          vantaEffect = (window as any).VANTA.GLOBE({
            el: backgroundRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
          });
        }
      } catch (error) {
        console.error("Error loading scripts or initializing Vanta:", error);
      }
    };

    loadScripts();

    // Cleanup Vanta effect on component unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <>
      <div
        ref={backgroundRef}
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        id="your-element-selector"

      >
        <div className="flex justify-center items-center h-screen ">
          <h2 className="text-5xl text-gray-300">Event Booking Platform</h2>
        </div>
      </div>
    </>
  );
};
