import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useMemo, useEffect } from "react";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";

function App() {
  const { play, end, setEnd } = usePlay();

  // This ensures the end state is triggered when the user reaches the end of the scroll
  useEffect(() => {
    if (play) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // If we're near the bottom of the page, trigger the end state
        if (scrollPosition + windowHeight >= documentHeight - 100) {
          setEnd(true);
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [play, setEnd]);

  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.08} />
      </EffectComposer>
    ),
    []
  );

  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls
          pages={play && !end ? 20 : 0}
          damping={0.5}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
        >
          <Experience />
        </ScrollControls>
        {effects}
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
