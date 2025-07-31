import { useState } from 'react';
import Counter from './Counter'; 
const API_URL = import.meta.env.VITE_API_URL;
import { Card, CardContent, Typography, Box, Button, AspectRatio, CardOverflow } from '@mui/joy';

export default function Item({ id ,name, image, count = {}, type }) {
  const [updated, setUpdated] = useState(count);

  console.log(count);
  

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
        count: updated 
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
        flexDirection: { xs: "column", md: "row" },
        alignItems: "stretch",
        maxWidth: 1000,
        mx: "auto",
        my: 2,
        p: 0,
        overflow: "hidden",
        borderRadius: "lg",
        height: { xs: 'auto', md: 180 },
      }}
    >
      <CardOverflow
        sx={{
          flexShrink: 0,
          width: { xs: '100%', md: 200 },
        }}
      >
        <AspectRatio ratio={1} sx={{ width: '100%', height: '100%', minHeight: 200 }}>
          <img
            src={`${API_URL}${image}`}
            alt={name}
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            level="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              flex: 1,
            }}
          >
            {name}
          </Typography>

          <Button
            size="sm"
            onClick={handlePatch}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Zatwierdź zmiany
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {Object.entries(count).map(([count, quantity]) => (
            <Counter
              key={count}
              size={count}
              amount={quantity}
              onChange={handleCounterChange}
              sx={{ minWidth: 70, maxWidth: 90 }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
