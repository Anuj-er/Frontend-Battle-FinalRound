import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { useEffect } from "react";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  
  useEffect(() => {
    if (end) {
      // Add a delay before redirecting to allow the outro animation to play
      const redirectTimer = setTimeout(() => {
        window.location.href = "https://frontend-battle-final-round.vercel.app/";
      }, 3000); // 3 seconds delay
      
      return () => clearTimeout(redirectTimer);
    }
  }, [end]);
  
  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            INLIGHN TECH
            <div className="spinner">
              <div className="spinner__image" />
            </div>
          </h1>
          <p className="intro__scroll">
            Transform your career with our immersive internship programs
          </p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Explore
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Ready to start your journey?</p>
        <p className="intro__scroll">Redirecting to website...</p>
      </div>
    </div>
  );
};
