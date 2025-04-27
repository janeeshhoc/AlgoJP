import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/nqueens.css";
import { Button } from "../components/Btn";
import chessBg from "../icons/Chess.jpg";

var SpeedTime = 200;
function N_Queen() {
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(4);

  useEffect(() => {
    gridInit();
  }, [gridSize]);

  const gridInit = () => {
    grid.forEach((row, i) => {
      row.forEach((v, j) => {
        if ((i + j) % 2 === 0)
          document.getElementById(`cell-${i}-${j}`).classList =
            "queen-cell gray-cell";
        else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
      });
    });
    let grid1 = new Array(gridSize);
    for (let i = 0; i < gridSize; i++)
      grid1[i] = new Array(gridSize).fill(false);
    setGrid(grid1);
  };

  var isSafe = async (r, c) => {
    var flag = 1;
    // row-wise
    for (let j = 0; j < c; j++) {
      if (grid[r][j]) {
        flag = 0;
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell blue-cell";
    }
    for (let j = c + 1; j < gridSize; j++) {
      if (grid[r][j]) {
        flag = 0;
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell blue-cell";
    }
    // col-wise
    for (let i = 0; i < r; i++) {
      if (grid[i][c]) {
        flag = 0;
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell blue-cell";
    }
    for (let i = r + 1; i < gridSize; i++) {
      if (grid[i][c]) {
        flag = 0;
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell blue-cell";
    }
    // right diagonal
    for (let i = r + 1, j = c + 1; i < gridSize && j < gridSize; i++, j++) {
      if (grid[i][j]) {
        flag = 0;
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell blue-cell";
    }
    for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
      if (grid[i][j]) {
        flag = 0;
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell blue-cell";
    }
    // left diagonal
    for (let i = r + 1, j = c - 1; i < gridSize && j >= 0; i++, j--) {
      if (grid[i][j]) {
        flag = 0;
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell blue-cell";
    }
    for (let i = r - 1, j = c + 1; i >= 0 && j < gridSize; i--, j++) {
      if (grid[i][j]) {
        flag = 0;
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img blue-cell";
      } else
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell blue-cell";
    }

    await waitForAnimatoin(SpeedTime);
    // ------------------------- undo ---------------------------
    // row-wise
    for (let j = 0; j < c; j++) {
      if (grid[r][j])
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((r + j) % 2 === 0)
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${r}-${j}`).classList = "queen-cell";
    }
    for (let j = c + 1; j < gridSize; j++) {
      if (grid[r][j])
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((r + j) % 2 === 0)
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${r}-${j}`).classList = "queen-cell";
    }
    // col-wise
    for (let i = 0; i < r; i++) {
      if (grid[i][c])
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + c) % 2 === 0)
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${c}`).classList = "queen-cell";
    }
    for (let i = r + 1; i < gridSize; i++) {
      if (grid[i][c])
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + c) % 2 === 0)
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${c}`).classList = "queen-cell";
    }
    // right diagonal
    for (let i = r + 1, j = c + 1; i < gridSize && j < gridSize; i++, j++) {
      if (grid[i][j])
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + j) % 2 === 0)
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
    }
    for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
      if (grid[i][j])
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + j) % 2 === 0)
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
    }
    // left diagonal
    for (let i = r + 1, j = c - 1; i < gridSize && j >= 0; i++, j--) {
      if (grid[i][j])
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + j) % 2 === 0)
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
    }
    for (let i = r - 1, j = c + 1; i >= 0 && j < gridSize; i--, j++) {
      if (grid[i][j])
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + j) % 2 === 0)
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
    }
    return flag;
  };

  var n_queen = async (c, q) => {
    if (c >= gridSize || q >= gridSize) {
      return q >= gridSize;
    }
    for (var r = 0; r < gridSize; r++) {
      document.getElementById(`cell-${r}-${c}`).classList =
        "queen-cell queen-img yellow-cell";
      await waitForAnimatoin(SpeedTime);

      if (await isSafe(r, c)) {
        document.getElementById(`cell-${r}-${c}`).classList =
          "queen-cell queen-img green-cell";
        grid[r][c] = true;
        if (await n_queen(c + 1, q + 1)) return true;

        // backtrack
        grid[r][c] = false;
        if ((r + c) % 2 === 0)
          document.getElementById(`cell-${r}-${c}`).classList =
            "queen-cell gray-cell";
        else document.getElementById(`cell-${r}-${c}`).classList = "queen-cell";
      } else if ((r + c) % 2 === 0)
        document.getElementById(`cell-${r}-${c}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${r}-${c}`).classList = "queen-cell";
    }
    return false;
  };

  const startHandle = async () => {
    document.getElementsByTagName("button")[0].disabled = true;
    document.getElementsByTagName("button")[1].disabled = true;
    document.getElementById("gridSizeRange").disabled = true;
    await n_queen(0, 0);
    document.getElementsByTagName("button")[0].disabled = false;
    document.getElementsByTagName("button")[1].disabled = false;
    document.getElementById("gridSizeRange").disabled = false;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${chessBg})`
      }}
    >
      <Navbar msg="N Queen"></Navbar>
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-row items-center justify-between bg-gray-800 bg-opacity-90 rounded-lg p-4 shadow-lg mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">N-Queens Visualizer</h1>
            <div className="flex gap-2">
              <Button 
                onClick={startHandle} 
                label="Start" 
                isBgColor 
                className="px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300" 
              />
              <Button
                onClick={() => {
                  gridInit();
                }}
                label="Clear"
                className="px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
              />
            </div>
          </div>

          <div className="queen_range flex items-center gap-2">
            <div className="queenlabel">Size:</div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                onChange={(e) => {
                  setGridSize(parseInt(e.target.value));
                }}
                value={gridSize}
                min="3"
                max="8"
                step="1"
                id="gridSizeRange"
                className="w-24"
              />
              <span className="text-gray-300 text-sm">{gridSize}×{gridSize}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid-container bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-2xl">
            {grid.map((row, i) => {
              return (
                <div key={i} className="queen-row">
                  {row.map((v, j) => {
                    if ((i + j) % 2 === 0)
                      return (
                        <div
                          id={`cell-${i}-${j}`}
                          key={j}
                          className="queen-cell gray-cell"
                        ></div>
                      );
                    return (
                      <div
                        id={`cell-${i}-${j}`}
                        key={j}
                        className="queen-cell"
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

async function waitForAnimatoin(times) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, times);
  });
}
export default N_Queen;
