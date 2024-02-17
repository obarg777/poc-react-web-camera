"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");

  const getVideo = () => {
    navigator?.mediaDevices
      ?.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode,
        },
      })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClick = () => {
    setFacingMode(facingMode === "user" ? "enviroment" : "user");
    getVideo();
  };

  useEffect(() => {
    setFacingMode("user");
    getVideo();
  }, []);

  return (
    <div>
      <h1>camera</h1>
      <button onClick={handleClick} style={{ height: 100, width: 100 }}>
        Get Video
      </button>
      <video style={{ width: "100%" }} ref={videoRef}></video>
    </div>
  );
}
