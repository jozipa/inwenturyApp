import './Item.css';
import { useState } from 'react';
import Counter from './Counter'; 
const API_URL = import.meta.env.VITE_API_URL;
import { Card, CardContent } from '@mui/joy';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import CardMedia from '@mui/material/CardMedia';

import Badge from '@mui/joy/Badge';


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
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "stretch",
        maxWidth: 1000,
        mx: "auto",
        my: 2,
        overflow: "hidden",
        borderRadius: "lg",
        height: { xs: "auto", sm: 200 },
      }}
    >
      <CardOverflow
        sx={{
          minWidth: { xs: "100%", sm: 180 },
          maxWidth: { sm: 180 },
        }}
      >
        <AspectRatio
          ratio="1"
          sx={{
            height: "100%",
            "& > img": {
              objectFit: "cover",
              objectPosition: "left top",
            },
          }}
        >
          <img src={`${API_URL}${image}`} alt={name} loading="lazy" />
        </AspectRatio>
      </CardOverflow>

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
          py: 1,
        }}
      >
        <Typography
          level="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
            mb: 1,
          }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {Object.entries(sizes).map(([size, quantity]) => (
            
              <Counter
                key={size}
                size={size}
                amount={quantity}
                onChange={handleCounterChange}
                sx={{
                  flex: "0 1 auto",
                  minWidth: 70,
                  maxWidth: 90,
                }}
              />
          
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            size="sm"
            onClick={handlePatch}
            sx={{
              fontWeight: 600,
              width: { xs: "100%", sm: "fit-content" },
            }}
          >
            Zatwierdź zmiany
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}