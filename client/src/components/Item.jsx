import './Item.css';
import { useState } from 'react';
import Counter from './Counter'; 
const API_URL = import.meta.env.VITE_API_URL;


export default function Item({ id ,name, image, sizes = {}, description = '' }) {
  const [updated, setUpdated] = useState(sizes)
  
  function handleCounterChange(size, count) {
    setUpdated(prev => ({
      ...prev,
      [size]: count
    }));
  }

  function handlePatch(){
    fetch('http://localhost:3001/api/items', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        sizes: updated 
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Zaktualizowano rozmiary:', data);
      })
      .catch(err => {
        console.error('Błąd aktualizacji:', err);
      });
  }
  

  return (
    <div className="item-card">
      <img className="item-image" src={`${API_URL}${image}`} alt={name} />
      <div className="item-content">
        <h2>{name}</h2>
        {description && <p className="item-description">{description}</p>}
        <div className="item-sizes">
          {Object.entries(sizes).map(([size, quantity]) => (
            <Counter key={size} size={size} amount={quantity} onChange={handleCounterChange}></Counter>
          ))}
        </div>
      </div>
      <button onClick={handlePatch}>Zatwierdz zmiany</button>
    </div>
  );
}