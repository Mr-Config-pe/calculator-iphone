import React, { useState } from "react";
import "../assets/css/Calculator.css";
import backcel from "../assets/images/back-calculator.avif";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [doubleClick, setDoubleClick] = useState(false);
  const [fontSize, setFontSize] = useState(65);
  const operators = ["+", "-", "*", "/", "%"];

  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleClick = (value) => {
    if (display.length < 15) {
      let newDisplay =
        display === "0" && (value === "." || !operators.includes(value))
          ? value
          : display + value;
      if (
        operators.includes(value) &&
        (operators.includes(display[display.length - 1]) ||
          display[display.length - 1] === ".")
      ) {
        newDisplay = display.slice(0, display.length - 1) + value;
      }
      setDisplay(newDisplay);
      let fontSize = 65;
      if (display.length > 3 && display.length <= 4) {
        fontSize = 60;
      } else if (display.length > 4 && display.length <= 5) {
        fontSize = 55;
      } else if (display.length > 5 && display.length <= 6) {
        fontSize = 50;
      } else if (display.length > 6 && display.length <= 7) {
        fontSize = 45;
      } else if (display.length > 7 && display.length <= 8) {
        fontSize = 40;
      } else if (display.length > 8 && display.length <= 9) {
        fontSize = 35;
      } else if (display.length > 9 && display.length <= 10) {
        fontSize = 30;
      } else if (display.length > 10 && display.length <= 11) {
        fontSize = 25;
      } else if (display.length > 11 && display.length <= 15) {
        fontSize = 20;
      }
      setFontSize(fontSize);
    }
  };

  const handleEvaluate = () => {
    // eslint-disable-next-line
    let result = eval(display);
    result = Number(result.toFixed(5));
    setDisplay(result.toString());
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleBackspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const handleDecimal = () => {
    let parts = display.split(/[/+/*/-]/);
    let lastPart = parts[parts.length - 1];
    let lastCharacter = display[display.length - 1];

    if (!lastPart.includes(".") && !/[/+/*/-]/.test(lastCharacter)) {
      setDisplay(display + ".");
    }
  };

  const handlePercentage = () => {
    // eslint-disable-next-line
    setDisplay((eval(display) / 100).toString());
  };

  const handleClearOrBackspace = () => {
    if (doubleClick) {
      setFontSize(65);

      handleClear();
      setDoubleClick(false);
    } else {
      handleBackspace();
      setDoubleClick(true);
    }
    setTimeout(() => {
      setDoubleClick(false);
    }, 500);
  };

  const handleSignChange = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  return (
    // eslint-disable-next-line
    <div className="calculator">
      <img
        src={backcel}
        className="back-cel"
        alt="Fondo de Iphone para React"
      />
      <div className="container-row">
        <div className="display" style={{ fontSize: `${fontSize}px` }}>
          {formatNumberWithCommas(display)}
        </div>
        <div className="row">
          <button onClick={handleClearOrBackspace} className="btn-gris">
            {display !== "0" ? "C" : "AC"}
          </button>
          <button onClick={handleSignChange} className="btn-gris">
            +/-
          </button>
          <button onClick={handlePercentage} className="btn-gris">
            %
          </button>
          <button onClick={() => handleClick("/")} className="symbol">
            ÷
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("7")} className="number-calc">
            7
          </button>
          <button onClick={() => handleClick("8")} className="number-calc">
            8
          </button>
          <button onClick={() => handleClick("9")} className="number-calc">
            9
          </button>
          <button onClick={() => handleClick("*")} className="symbol">
            ×
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("4")} className="number-calc">
            4
          </button>
          <button onClick={() => handleClick("5")} className="number-calc">
            5
          </button>
          <button onClick={() => handleClick("6")} className="number-calc">
            6
          </button>
          <button onClick={() => handleClick("-")} className="symbol">
            -
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("1")} className="number-calc">
            1
          </button>
          <button onClick={() => handleClick("2")} className="number-calc">
            2
          </button>
          <button onClick={() => handleClick("3")} className="number-calc">
            3
          </button>
          <button onClick={() => handleClick("+")} className="symbol">
            +
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("0")} className="number-calc cero">
            0
          </button>
          <button onClick={handleDecimal} className="symbol">
            .
          </button>
          <button onClick={handleEvaluate} className="symbol">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
