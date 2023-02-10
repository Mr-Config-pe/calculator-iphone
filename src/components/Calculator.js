import React, { useState } from "react";



function Calculator() {
  const [display, setDisplay] = useState("0");
  const [doubleClick, setDoubleClick] = useState(false);

  const handleClick = (value) => {
    if (display.length < 50) {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleBackspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const handleDecimal = () => {
    setDisplay(display.includes(".") ? display : display + ".");
  };


  const handleClearOrBackspace = () => {
    if (doubleClick) {
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
    
    <div className="calculator">
      
      <div className="display">{display}</div>
      <div className="row">
        <button onClick={handleClearOrBackspace} className="btn-gris">
          {doubleClick ? "AC" : "C"}
        </button>
        <button onClick={handleSignChange} className="btn-gris">
          +/-
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
      
      </div>
    </div>
  );
}

export default Calculator;
