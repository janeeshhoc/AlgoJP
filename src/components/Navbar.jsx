import * as React from "react";

function Navbar({ msg }) {
  return (
    <div className="bg-transparent mx-auto">
      <nav className="navbar max-w-5xl mx-auto flex justify-between items-center p-4">
        <div>
          <a className="navbarlink px-4 py-2 text-white border border-transparent hover:bg-gray-800 rounded transition duration-300" href="/JaneAlgo/">
            Home
          </a>
        </div>
        <div>
          <span className="text-white">{msg}</span>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
