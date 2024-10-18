import React from "react";

function Card(props) {
  const [imgURL, text] = props.array;
  return (
    <div className="card-body bg-gray-900 rounded-lg shadow-lg border border-red-400 overflow-hidden transition-transform transform hover:scale-105 m-4 
      w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
      <div className="w-full h-4/5">
        <img className="w-full h-full object-cover rounded-t-lg" src={imgURL} alt="" />
      </div>
      <p className="p-1 text-center text-white text-sm sm:text-base md:text-lg font-medium">
        {text}
      </p>
    </div>
  );
}

export default Card;
