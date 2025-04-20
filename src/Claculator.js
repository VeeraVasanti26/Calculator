import React, { useState, useEffect } from 'react';
import './Calculator.css'; 
const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState('');
  const [lastInput, setLastInput] = useState(null);
  const [con, setCon] = useState(false);

  useEffect(() => {
    const savedResult = JSON.parse(localStorage.getItem('result'));
    if (savedResult) {
      setHistory(savedResult);
      setInput(savedResult);
    }
  }, []);

  const operators = ['+', '-', '*', '/', '.'];

  const handleClick = (value) => {
    const isOperator = operators.includes(value);
    const lastChar = input.slice(-1);

    if (con && !isOperator) {
      setInput(value);
      setHistory('');
      setCon(false);
      return;
    }

    if (isOperator && operators.includes(lastChar)) {
      return;
    }

    if (value === '.') {
      const parts = input.split(/[\+\-\*\/]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) {
        return;
      }
    }

    setInput(input + value);
    setHistory('');
  };

  const handleClear = () => {
    setInput('');
    setHistory('');
  };

  const handleRemove = () => {
    if (con && history !== '') {
      setCon(false);
      setInput(history);
      setHistory('');
    } else {
      setInput(input.slice(0, -1));
      setHistory('');
    }
  };

  const handleEvaluate = () => {
    setHistory(input);
    try {
      const result = eval(input);
      setInput(result);
      localStorage.setItem('result', JSON.stringify(result));
    } catch (error) {
      setInput(input);
    }
    setCon(true);
  };

  const handleKeyPress = (event) => {
    const keyMap = {
      'Backspace': handleRemove,
      'Delete': handleClear,
      'Enter': handleEvaluate
    };
    if (keyMap[event.key]) {
      keyMap[event.key]();
    } else if (operators.includes(event.key) || '0123456789'.includes(event.key) || event.key === '.') {
      handleClick(event.key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [input, history]);

  return (
    <div className="calcu">
      <div className="replay">{history}</div>
      <input type="text" className="text" value={input} readOnly />
      <div className="keys">
        {['AC', '(', ')', '/'].map((label) => (
          <button key={label} onClick={() => label === 'AC' ? handleClear() : handleClick(label)} className="oper">
            {label}
          </button>
        ))}
        {[7, 8, 9, '*'].map((label) => (
          <button key={label} onClick={() => handleClick(String(label))} className={label === '*' ? 'oper' : ''}>
            {label}
          </button>
        ))}
        {[4, 5, 6, '-'].map((label) => (
          <button key={label} onClick={() => handleClick(String(label))} className={label === '-' ? 'oper' : ''}>
            {label}
          </button>
        ))}
        {[1, 2, 3, '+'].map((label) => (
          <button key={label} onClick={() => handleClick(String(label))} className={label === '+' ? 'oper' : ''}>
            {label}
          </button>
        ))}
        {['0', '.', 'DEL', '='].map((label) => (
          <button key={label} onClick={() => label === 'DEL' ? handleRemove() : label === '=' ? handleEvaluate() : handleClick(label)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
