import './Item.css';
import { useState } from 'react';
import Counter from './Counter'; 
const API_URL = import.meta.env.VITE_API_URL;
import { Card, CardContent } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';


export default function Item({ id ,name, image, sizes = {} }) {
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
    // <div className="item-card">
    //   <img className="item-image" src={`${API_URL}${image}`} alt={name} />
    //   <div className="item-content">
    //     <h2>{name}</h2>
    //     <div className="item-sizes">
    //       {Object.entries(sizes).map(([size, quantity]) => (
    //         <Counter key={size} size={size} amount={quantity} onChange={handleCounterChange}></Counter>
    //       ))}
    //     </div>
    //   </div>
    //   <button onClick={handlePatch}>Zatwierdz zmiany</button>
    // </div>
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        m: 2,
        borderRadius: 'lg',
        maxWidth: 1000,
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 120, borderRadius: 'md' }}>
        <img
          src={`${API_URL}${image}`}
          alt={name}
          loading="lazy"
        />
      </AspectRatio>
      <div>

      <CardContent sx={{ flex: 1 }}>
        <Typography level="h3" color='neutral' sx={{ fontWeight: 650 }}>{name}</Typography>


        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {Object.entries(sizes).map(([size, quantity]) => (
            <Counter key={size} size={size} amount={quantity} onChange={handleCounterChange}></Counter>
          ))}
        </Box>
        
      </CardContent>
      <Button sx={{mt:2}} onClick={handlePatch}>Zatwierdz zmiany</Button>
      </div>
    </Card>
  );
}