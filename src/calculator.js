import React, { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleDigitClick = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleEqualsClick = () => {
    if (firstOperand && operator) {
      const inputValue = parseFloat(display);
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div style={{ width: '200px', margin: '20px auto', border: '1px solid #ccc', padding: '10px' }}>
      <input type="text" value={display} style={{ width: '100%', marginBottom: '10px' }} readOnly />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        <button onClick={() => handleDigitClick('7')}>7</button>
        <button onClick={() => handleDigitClick('8')}>8</button>
        <button onClick={() => handleDigitClick('9')}>9</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
        <button onClick={() => handleDigitClick('4')}>4</button>
        <button onClick={() => handleDigitClick('5')}>5</button>
        <button onClick={() => handleDigitClick('6')}>6</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleDigitClick('1')}>1</button>
        <button onClick={() => handleDigitClick('2')}>2</button>
        <button onClick={() => handleDigitClick('3')}>3</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleDigitClick('0')}>0</button>
        <button onClick={() => handleDecimalClick()}>.</button>
        <button onClick={() => handleEqualsClick()}>=</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleClearClick()}>C</button>
      </div>
    </div>
  );
}

export default Calculator;