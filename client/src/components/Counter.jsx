import { useState } from 'react';
import './Item.css';

export default function Counter({ amount, size, onChange }) {
  const [counter, setCounter] = useState(amount);

  const handleChange = (val) => {
    setCounter(val);
    if (onChange) onChange(size, val);
  };

  return (
    <div className="item-size">
      <strong>{size}</strong>: 
      <div>
        {counter}
        <button onClick={() => handleChange(counter + 1)}>Plus</button>
        <button onClick={() => handleChange(counter - 1)}>Minus</button>
      </div>
    </div>
  );
}
