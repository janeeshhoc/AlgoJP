import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PathfindingVS from "./Pages/PathfindingVS";
import NQueen from "./Pages/N_Queen";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/path-finding" element={<PathfindingVS />} />
        <Route path="/nqueens" element={<NQueen />} />
      </Routes>
    </div>
  );
}

export default App;
