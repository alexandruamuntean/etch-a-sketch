function sketch() {
  const sketchPad = document.querySelector(".sketch-pad");
  const squareSize = document.querySelector("#square-size");
  const squareDensity = document.querySelector(".square-density");
  const resetBtn = document.querySelector('[data-action="reset"]');
  const rainbowBtn = document.querySelector('[data-action="randomize"]');
  const defaultBtn = document.querySelector('[data-action="default"]');
  const eraserBtn = document.querySelector('[data-action="eraser"]');

  const createSquare = (numOfSquares) => {
    const unit = 500 / numOfSquares;
    for (let i = 0; i < numOfSquares; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      row.style.height = `${unit}px`;
      sketchPad.appendChild(row);
      for (let j = 0; j < numOfSquares; j++) {
        const square = document.createElement("div");
        square.style.width = `${unit}px`;
        square.classList.add("square");
        row.appendChild(square);
      }
    }
  };

  const removeSquare = () => {
    sketchPad.innerHTML = "";
  };

  const slider = () => {
    squareDensity.textContent = squareSize.value;
    createSquare(parseFloat(squareSize.value));
    hover();
    squareSize.addEventListener("input", () => {
      squareDensity.textContent = squareSize.value;
      removeSquare();
      createSquare(parseFloat(squareSize.value));
      hover();
    });
  };

  const reset = () => {
    resetBtn.addEventListener("click", () => {
      removeSquare();
      createSquare(parseInt(squareSize.value));
      hover();
    });
  };

  const randomize = () => {
    const randomValue = () => Math.floor(Math.random() * 255) + 1;
    return `rgb(${randomValue()},${randomValue()},${randomValue()})`;
  };

  const defaultColor = () => {
    return "#000";
  };

  const eraserColor = () => {
    return "#fff";
  };

  const colorSquare = (square, color) => {
    square.style.backgroundColor = color;
  };

  const hover = (value) => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("mouseover", () =>
        colorSquare(square, `${value()}`)
      );
    });
  };

  const rainbow = () => {
    rainbowBtn.addEventListener("click", () => {
      randomize();
      hover(randomize);
    });
  };

  const setDefault = () => {
    defaultBtn.addEventListener("click", () => {
      defaultColor();
      hover(defaultColor);
    });
  };

  const eraser = () => {
    eraserBtn.addEventListener("click", () => {
      eraserColor();
      hover(eraserColor);
    });
  };

  slider();
  reset();
  rainbow();
  setDefault();
  eraser();
}

sketch();
