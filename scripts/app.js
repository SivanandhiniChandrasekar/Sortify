"use strict";
const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 0.25;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }
  
  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
  if(algoValue === 6) await algorithm.HeapSort();
  if(algoValue === 7) await algorithm.CountingSort();
  if(algoValue === 8) await algorithm.RadixSort();
  if(algoValue === 9) await algorithm.BucketSort();
  if(algoValue === 10) await algorithm.ShellSort();
  if(algoValue === 11) await algorithm.TimSort();
  if(algoValue === 12) await algorithm.CombSort();
  if(algoValue ===13) await algorithm.PigeonholeSort();
  if(algoValue === 15) await algorithm.CocktailSort();
};

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);

  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    node.style.position = "relative"; 
    node.style.display = "flex";
    node.style.alignItems = "flex-end"; // Align number to the bottom
    node.style.justifyContent = "center"; // Center number horizontally
    node.style.fontSize = "12px";
    node.style.color = "white"; // Ensure number is visible
    node.style.fontWeight = "bold";
    node.innerHTML = element;
    arrayNode.appendChild(node);
    //arrayNode.textContent=element;
  }
};

// Function to update displayed code
document.querySelector(".algo-menu").addEventListener("change", function () {
  let selectedAlgo = this.value;
  document.getElementById("code-display").textContent =
    algorithmCodes[selectedAlgo] || "Select an algorithm to see its code here.";
});

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;
