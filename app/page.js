"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
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

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div>
      <h1>camera</h1>
      <video style={{ width: "100%" }} ref={videoRef}></video>
    </div>
  );
}
