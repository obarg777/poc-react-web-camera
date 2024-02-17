"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");

  const stopVideo = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    video.srcObject = null;
  };

  const getVideo = () => {
    stopVideo();

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
    setFacingMode(facingMode === "user" ? "environment" : "user");
    getVideo();
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div>
      <h1>camera - {facingMode}</h1>
      <button onClick={handleClick} style={{ height: 100, width: 100 }}>
        Switch Camera
      </button>
      <video
        style={{
          width: "100%",
          transform: facingMode === "user" ? "scaleX(-1)" : "",
        }}
        ref={videoRef}
      ></video>
    </div>
  );
}
