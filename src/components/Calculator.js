/* ---------- Editado By Immer ---------- */

import React, { useEffect, useState } from "react";
import "../assets/css/Calculator.css";
import backcel from "../assets/images/back-calculator.avif";

function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [operand1, setOperand1] = useState(null);
  /* const [operand2, setOperand2] = useState(null); */
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const [disablePoint, setDisablePoint] = useState(false);

  const [fontSize, setFontSize] = useState(65);

  useEffect(() => {
    if (displayValue.length > 6) { /* Empieza el cambio de tamaño de fuente*/
      setFontSize(65 - (displayValue.length - 4) * 4);
    } else {
      setFontSize(65);
    }
  }, [displayValue]);


  const formatNumber = (num) => {
    const isDecimal = num % 1 !== 0;
    return isDecimal
      ? num.toString()
      : num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); /* Separador decimales coma */
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
      setDisablePoint(true);
    } else {
      if (digit === "." && displayValue.includes(".")) {
        return;
      }
      if (displayValue.length < 8) { /* Termina el cambio de fuente*/
        setDisplayValue(
          displayValue === "0" && digit !== "." ? String(digit) : displayValue + digit
        );
        setDisablePoint(true);
      }
    }
  };
  

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);
  
    if (operand1 === null) {
      setOperand1(inputValue);
    } else if (operator) {
      const currentValue = operand1 || 0;
      let result = performCalculation[operator](currentValue, inputValue);
  
      if (result.toString().includes('.')) {
        result = result.toFixed(2);
      } else {
        result = Math.round(result);
      }
  
      setOperand1(result);
      setDisplayValue(result.toString());
    }
  
    setWaitingForOperand(true);
    setOperator(nextOperator);
    setDisablePoint(false);
    setFontSize(fontSize); /* Mantiene la fuente antes de la operacion */
  };
  
  const performPercentage = () => {
    const inputValue = parseFloat(displayValue);
    setDisplayValue(inputValue / 100);
    setWaitingForOperand(true);
    console.log(inputValue);
    console.log(operand1);
  };

  const performCalculation = {
    "/": (a, b) => a / b,
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "=": (a, b) => b,
  };

  const changeSign = () => {
    setDisplayValue((displayValue * -1).toString());
  };

  /* Inicio Borrado de Pantalla */

  const handleBackspace = () => {
    setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : "0");
  };

  const handleClear = () => {
    setDisplayValue("0");
    setOperator(null);
    setOperand1(null);
    /* setOperand2(null);*/
    setWaitingForOperand(false);
  };

  const handleClearOrBackspace = () => {
    if (doubleClick) {
      /*setFontSize(65); Desabilitado*/ 
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

  /* Fin Borrado de Pantalla */

  return (
    <div className="calculator">
      <img
        src={backcel}
        className="back-cel"
        alt="Fondo de Iphone para React"
      />
      <div className="container-row">
        <div className="display" style={{ fontSize: `${fontSize}px` }}>{formatNumber(displayValue)}</div>
        <div className="row">
          <button onClick={handleClearOrBackspace} className="btn-gris">
            {displayValue !== "0" ? "C" : "AC"}
          </button>
          <button onClick={() => changeSign()} className="btn-gris">
            +/-
          </button>
          <button onClick={() => performPercentage()} className="btn-gris">
            %
          </button>
          <button onClick={() => performOperation("/")} className="symbol">
            ÷
          </button>
        </div>
        <div className="row">
          <button onClick={() => inputDigit(7)} className="number-calc">
            7
          </button>
          <button onClick={() => inputDigit(8)} className="number-calc">
            8
          </button>
          <button onClick={() => inputDigit(9)} className="number-calc">
            9
          </button>
          <button onClick={() => performOperation("*")} className="symbol">
            ×
          </button>
          <br />
        </div>
        <div className="row">
          <button onClick={() => inputDigit(4)} className="number-calc">
            4
          </button>
          <button onClick={() => inputDigit(5)} className="number-calc">
            5
          </button>
          <button onClick={() => inputDigit(6)} className="number-calc">
            6
          </button>
          <button onClick={() => performOperation("-")} className="symbol">
            -
          </button>
          <br />
        </div>
        <div className="row">
          <button onClick={() => inputDigit(1)} className="number-calc">
            1
          </button>
          <button onClick={() => inputDigit(2)} className="number-calc">
            2
          </button>
          <button onClick={() => inputDigit(3)} className="number-calc">
            3
          </button>
          <button onClick={() => performOperation("+")} className="symbol">
            +
          </button>
          <br />
        </div>
        <div className="row">
          <button onClick={() => inputDigit(0)} className="number-calc cero">
            0
          </button>
          <button onClick={() => inputDigit(".")} className="number-calc" disabled={!disablePoint}>
            .
          </button>
          <button onClick={() => performOperation("=")} className="symbol">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator; 

/* ---------- Editado By Immer ---------- */