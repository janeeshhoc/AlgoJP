import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import "../styles/home.css";
import img1 from "../icons/path-find.jpg";
import img4 from "../icons/Chess.jpg";
import desktopImage from "../icons/desk.png";
import { Link } from "react-router-dom";

function Home() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div
      className={`home-container relative ${isDesktop ? "bg-cover bg-center bg-fixed" : ""}`}
      style={{
        backgroundImage: isDesktop ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${desktopImage})` : "none",
      }}
    >
      <div className="content-wrapper">
        <h1 className="main-title">Algorithm Visualizer</h1>
        <p className="subtitle">Explore and visualize various algorithms in action</p>
        <div className="cards-container">
          <Link className="card-link" to="/path-finding">
            <Card array={[img1, "Path-Finder"]} />
          </Link>
          <Link className="card-link" to="/nqueens">
            <Card array={[img4, "N queens problem"]} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
