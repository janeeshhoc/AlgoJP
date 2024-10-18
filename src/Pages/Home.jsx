import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import "../styles/home.css"; // Tailwind CSS is typically imported here
import img1 from "../icons/path-find.jpg";
import img2 from "../icons/sort.jpg";
import img4 from "../icons/Chess.jpg";
import desktopImage from "../icons/desk.jpg"; // Desktop image
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
      className={`Mycontainer relative p-4 ${isDesktop ? "bg-cover bg-center" : ""}`}
      style={{
        backgroundImage: isDesktop ? `url(${desktopImage})` : "none",
      }}
    >
      <Navbar msg={"Janeesh P"} />

      <h2 className="text-2xl md:text-3xl text-center text-stone-200 py-4 relative z-10 bg-opacity-75 p-2 rounded-md">
        Decode The Algorithms Like A Pro
      </h2>

      <div className="cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        <Link className="no-underline" to="/path-finding">
          <Card array={[img1, "Path-Finder"]} />
        </Link>
        <Link className="no-underline" to="/sorting">
          <Card array={[img2, "Sorting Algorithms"]} />
        </Link>
        <Link className="no-underline" to="/nqueens">
          <Card array={[img4, "N queens problem"]} />
        </Link>
      </div>
    </div>
  );
}

export default Home;
