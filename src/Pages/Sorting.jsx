import React, { useEffect, useState } from "react";
import "../styles/sorting.css";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { Button } from "../components/Btn";

var BARS = 100;
const barWidth = 15;
var SPEED = 500;

async function waitForAnimate(sp) {
  sp = sp < 5 ? 5 : sp;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, sp);
  });
}

function SortingApp() {
  const [bar, setBar] = useState([80, 40, 20, 70, 30]);
  var [speed, setSpeed] = useState(SPEED);
  const [sortID, setSortID] = useState(3);

  useEffect(() => {
    init();
    popupClickHandle();
  }, []);

  const init = () => {
    var arr = [];
    for (let i = 0; i < BARS; i++) {
      let x = Math.floor(Math.random() * 1000) % 400;
      arr.push(x);
    }
    setBar(arr);
  };
  var ORGINAL_COLOR = "#3498DB";
  var COMP_COLOR = "#FF5959";
  var SORTED_COLOR = "#6C3483";
  var PIVOT_COLOR = "orange";

  const swap = (i, j, newBars) => {
    document.getElementById("bar-" + i).style.height = newBars[j] + "px";
    document.getElementById("bar-" + j).style.height = newBars[i] + "px";

    var tmp = newBars[i];
    newBars[i] = newBars[j];
    newBars[j] = tmp;
  };
  // -----------  All Sorting Algorithm  -----------
  async function bubbleSort() {
    var newBars = []; //copy the array
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    for (var i = 0; i < newBars.length; i++) {
      for (var j = 0; j < newBars.length - 1 - i; j++) {
        document.getElementById("bar-" + j).style.background = COMP_COLOR;
        document.getElementById("bar-" + (j + 1)).style.background = COMP_COLOR;
        // we control animation speed with async/await and Promise.
        await waitForAnimate(SPEED); // global var
        document.getElementById("bar-" + j).style.background = ORGINAL_COLOR;
        document.getElementById("bar-" + (j + 1)).style.background =
          ORGINAL_COLOR;

        if (newBars[j] > newBars[j + 1]) {
          swap(j, j + 1, newBars);
        }
      }
      var sorted = newBars.length - 1 - i;
      document.getElementById("bar-" + sorted).style.background = SORTED_COLOR;
    }
  }
  async function selectionSort() {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    for (var i = 0; i < newBars.length; i++) {
      var leastIdx = i;
      document.getElementById("bar-" + leastIdx).style.background = "black";

      for (var j = i + 1; j < newBars.length; j++) {
        document.getElementById("bar-" + j).style.background = COMP_COLOR;
        await waitForAnimate(SPEED); // global var
        document.getElementById("bar-" + j).style.background = ORGINAL_COLOR;

        if (newBars[j] < newBars[leastIdx]) {
          document.getElementById("bar-" + leastIdx).style.background =
            ORGINAL_COLOR;
          leastIdx = j;
          document.getElementById("bar-" + leastIdx).style.background = "black";
        }
      }
      // swap
      swap(i, leastIdx, newBars);
      document.getElementById("bar-" + leastIdx).style.background =
        ORGINAL_COLOR;
      document.getElementById("bar-" + i).style.background = SORTED_COLOR;
    }
  }
  const insertionSort = async () => {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    for (var i = 1; i < newBars.length; i++) {
      var tmp = newBars[i],
        j = i - 1;
      document.getElementById("bar-" + i).style.transform = "translateY(15px)";

      while (j >= 0 && newBars[j] > tmp) {
        document.getElementById("bar-" + j).style.background = COMP_COLOR;
        document.getElementById("bar-" + (j + 1)).style.background =
          PIVOT_COLOR;

        await waitForAnimate(SPEED);
        newBars[j + 1] = newBars[j];
        document.getElementById("bar-" + (j + 1)).style.height =
          newBars[j] + "px";
        document.getElementById("bar-" + (j + 1)).style.background =
          SORTED_COLOR;
        j--;
      }
      newBars[j + 1] = tmp;
      document.getElementById("bar-" + (j + 1)).style.height = tmp + "px";
      document.getElementById("bar-" + (j + 1)).style.background = SORTED_COLOR;
      document.getElementById("bar-" + i).style.transform = "translateY(0px)";
    }
  };
  const partition = async (low, high, array) => {
    let pivot = high,
      i = low;
    document.getElementById("bar-" + pivot).style.background = PIVOT_COLOR;

    for (let j = low; j < high; j++) {
      document.getElementById("bar-" + j).style.background = COMP_COLOR;
      document.getElementById("bar-" + i).style.background = COMP_COLOR;
      await waitForAnimate(SPEED);
      document.getElementById("bar-" + j).style.background = ORGINAL_COLOR;
      document.getElementById("bar-" + i).style.background = ORGINAL_COLOR;

      if (array[j] <= array[pivot]) {
        swap(i, j, array);
        i++;
      }
    }
    swap(i, pivot, array);
    document.getElementById("bar-" + pivot).style.background = ORGINAL_COLOR;
    return i;
  };

  const quickSort = async (low, high, array) => {
    if (low >= high) return;
    let pi = await partition(low, high, array);
    await quickSort(low, pi - 1, array);
    await quickSort(pi + 1, high, array);
  };

  const mergeSort = async (low, high, array) => {
    if (low >= high) return;
    var mid = Math.floor((low + high) / 2);
    await mergeSort(low, mid, array);
    await mergeSort(mid + 1, high, array);

    // merge the array
    // console.log(low,high, mid);

    var newArr1 = [],
      newArr2 = [];
    for (let i = low; i <= mid; i++) {
      newArr1.push({ x: array[i], idx: i });
    }
    for (let i = mid + 1; i <= high; i++) {
      newArr2.push({ x: array[i], idx: i });
    }
    let i = 0,
      j = 0,
      k = low;
    while (i < newArr1.length && j < newArr2.length) {
      document.getElementById("bar-" + newArr1[i].idx).style.background =
        COMP_COLOR;
      document.getElementById("bar-" + newArr2[j].idx).style.background =
        COMP_COLOR;
      await waitForAnimate(SPEED);
      document.getElementById("bar-" + newArr1[i].idx).style.background =
        SORTED_COLOR;
      document.getElementById("bar-" + newArr2[j].idx).style.background =
        SORTED_COLOR;

      if (newArr1[i].x < newArr2[j].x) {
        array[k] = newArr1[i].x;
        document.getElementById("bar-" + k).style.height = array[k] + "px";
        i++;
      } else {
        array[k] = newArr2[j].x;
        document.getElementById("bar-" + k).style.height = array[k] + "px";
        j++;
      }
      k++;
    }
    while (i < newArr1.length) {
      array[k] = newArr1[i].x;
      document.getElementById("bar-" + k).style.height = array[k] + "px";
      document.getElementById("bar-" + k).style.background = SORTED_COLOR;
      i++;
      k++;
    }
    while (j < newArr2.length) {
      array[k] = newArr2[j].x;
      document.getElementById("bar-" + k).style.height = array[k] + "px";
      document.getElementById("bar-" + k).style.background = SORTED_COLOR;
      j++;
      k++;
    }
  };
  // -----------  End Sorting Algorithm  ----------

  const startSortingHandle = async () => {
    document.getElementsByTagName("button")[0].disabled = true;
    document.getElementsByTagName("button")[1].disabled = true;
    document.getElementsByTagName("select")[0].disabled = true;
    document.getElementsByTagName("select")[1].disabled = true;

    var newBars = [];
    switch (sortID) {
      case 1:
        await selectionSort();
        break;
      case 2:
        await insertionSort();
        break;
      case 3:
        for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);
        await quickSort(0, newBars.length - 1, newBars);
        break;
      case 4:
        newBars = [];
        for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);
        await mergeSort(0, newBars.length - 1, newBars);
        break;
      default:
        await bubbleSort();
        break;
    }
    document.getElementsByTagName("button")[0].disabled = false;
    document.getElementsByTagName("button")[1].disabled = false;
    document.getElementsByTagName("select")[0].disabled = false;
    document.getElementsByTagName("select")[1].disabled = false;
    bar.sort((a, b) => a > b);
  };

  const rangeValueHandle = (event) => {
    SPEED = parseInt(event.target.max) - parseInt(event.target.value);
    setSpeed(event.target.valueAsNumber);
  };
  const sizeHandle = (e) => {
    BARS = parseInt(e.target.value);
    generateNewArray();
  };
  const generateNewArray = () => {
    var arr = [];
    for (let i = 0; i < BARS; i++) {
      let x = Math.floor(Math.random() * 1000) % 400;
      arr.push(x);
    }
    for (let i = 0; i < bar.length; i++) {
      var dom = document.getElementById("bar-" + i);
      dom.style.backgroundColor = "#3498DB";
    }
    setBar(arr);
  };
  const popupClickHandle = () => {
    var blur = document.getElementById("Container-blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("unActive");
  };
  return (
    <>
      {/* pop up modal */}
      <Modal className="border border-slate-600 bg-gray-800 text-white rounded-lg shadow-lg p-8">
        <div style={{ marginRight: "20px", color: "#64748b" }}>
          <h1 className="text-3xl text-slate-200 text-center font-bold mb-4">
            Sorting Algorithms
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl text-slate-300 mt-2 mb-1">Bubble Sort</h2>
            <p className="text-slate-400 mb-2">
              Bubble Sort is a simple sorting algorithm that repeatedly steps
              through the list, compares adjacent elements, and swaps them if
              they are in the wrong order. The pass through the list is repeated
              until the list is sorted.
            </p>
            <h3 className="text-xl text-slate-300 mt-2 mb-1">Performance</h3>
            <ul className="list-disc list-inside text-slate-400">
              <li>
                Worst-case time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
              <li>
                Average time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
              <li>
                Best-case time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl text-slate-300 mt-2 mb-1">
              Selection Sort
            </h2>
            <p className="text-slate-400 mb-2">
              The selection sort algorithm sorts an array by repeatedly finding
              the minimum element (considering ascending order) from the
              unsorted part and putting it at the beginning.
            </p>
            <h3 className="text-xl text-slate-300 mt-2 mb-1">Performance</h3>
            <ul className="list-disc list-inside text-slate-400">
              <li>
                Worst-case time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
              <li>
                Average time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
              <li>
                Best-case time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl text-slate-300 mt-2 mb-1">
              Insertion Sort
            </h2>
            <p className="text-slate-400 mb-2">
              Insertion sort is a simple sorting algorithm that works similarly
              to the way you sort playing cards in your hands. The array is
              virtually split into a sorted and an unsorted part. Values from
              the unsorted part are picked and placed at the correct position in
              the sorted part.
            </p>
            <h3 className="text-xl text-slate-300 mt-2 mb-1">Performance</h3>
            <ul className="list-disc list-inside text-slate-400">
              <li>
                Worst-case time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
              <li>
                Average time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
              <li>
                Best-case time complexity:{" "}
                <span className="text-slate-200">O(n)</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl text-slate-300 mt-2 mb-1">Quick Sort</h2>
            <p className="text-slate-400 mb-2">
              QuickSort is a Divide and Conquer algorithm. It picks an element
              as a pivot and partitions the given array around the picked pivot.
            </p>
            <ul className="mt-2 mb-4 ml-2 list-disc list-inside text-slate-400">
              <li>Always pick the first element as a pivot.</li>
              <li>Always pick the last element as a pivot.</li>
              <li>Pick a random element as a pivot.</li>
              <li>Pick median as the pivot.</li>
            </ul>
            <p className="text-slate-400 mb-2">
              The key process in quickSort is a partition(). The target of
              partitions is, given an array and an element x of an array as the
              pivot, put x at its correct position in a sorted array and put all
              smaller elements (smaller than x) before x, and put all greater
              elements (greater than x) after x. All this should be done in
              linear time.
            </p>
            <h3 className="text-xl text-slate-300 mt-2 mb-1">Performance</h3>
            <ul className="list-disc list-inside text-slate-400">
              <li>
                Worst-case time complexity:{" "}
                <span className="text-slate-200">O(n²)</span>
              </li>
              <li>
                Average time complexity:{" "}
                <span className="text-slate-200">O(n log n)</span>
              </li>
              <li>
                Best-case time complexity:{" "}
                <span className="text-slate-200">O(n log n)</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl text-slate-300 mt-2 mb-1">Merge Sort</h2>
            <p className="text-slate-400 mb-2">
              Merge Sort is an efficient, stable sorting algorithm that makes
              use of the divide and conquer strategy. Conceptually the algorithm
              works as follows:
            </p>
            <ol className="list-decimal list-inside mt-2 text-slate-400">
              <li>
                Divide the unsorted list into n sublists, each containing one
                element (a list of one element is considered sorted).
              </li>
              <li>
                Repeatedly merge sublists to produce new sorted sublists until
                there is only one sublist remaining. This will be the sorted
                list.
              </li>
            </ol>
            <h3 className="text-xl text-slate-300 mt-2 mb-1">Performance</h3>
            <ul className="list-disc list-inside text-slate-400">
              <li>
                Worst-case time complexity:{" "}
                <span className="text-slate-200">O(n log n)</span>
              </li>
              <li>
                Average time complexity:{" "}
                <span className="text-slate-200">O(n log n)</span>
              </li>
              <li>
                Best-case time complexity:{" "}
                <span className="text-slate-200">O(n log n)</span>
              </li>
            </ul>
          </div>
        </div>
      </Modal><div id="Container-blur" className="active">
  <Navbar msg="Sort Visualizer"></Navbar>
  <div className="sorting-container">
    <div className="Btn-Wrap flex justify-between items-center w-full px-8 mt-4">
      <Button
        onClick={startSortingHandle}
        label="Start Sorting"
        isBgColor
        className="text-sm px-3 py-1"
      />
      <Button
        onClick={generateNewArray}
        label="Generate New"
        className="text-sm px-3 py-1"
      />
      <select
        className="form-select text-sm mx-2"
        value={sortID}
        onChange={(e) => {
          setSortID(parseInt(e.target.value));
          generateNewArray();
        }}
        id="num1"
        name="num1"
      >
        <option value="0">Bubble Sort</option>
        <option value="1">Selection Sort</option>
        <option value="2">Insertion Sort</option>
        <option value="3">Quick Sort</option>
        <option value="4">Merge Sort</option>
      </select>
      <div className="st-speed-range flex items-center mx-2">
        <label className="sorting-label text-sm" htmlFor="range1">
          Speed:
        </label>
        <input
          type="range"
          onChange={rangeValueHandle}
          name="range1"
          id="range1"
          min="1"
          value={speed}
          max="1000"
          step="1"
          className="mx-2 w-64"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="num" className="text-sm">Choose Size: </label>
        <select
          className="form-select text-sm mx-2"
          value={bar.length}
          onChange={sizeHandle}
          id="num"
          name="num"
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="350">350</option>
        </select>
      </div>
    </div>
    <div className="wrapperBar flex justify-center mt-4">
      {bar.map((item, id) => {
        return (
          <div
            className="bar"
            id={"bar-" + id}
            key={id}
            style={{ width: barWidth, height: item }}
          ></div>
        );
      })}
    </div>
  </div>
</div>

    </>
  );
}

export default SortingApp;
