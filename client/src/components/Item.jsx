import { useState } from 'react';
import Counter from './Counter'; 
const API_URL = import.meta.env.VITE_API_URL;
import { Card, CardContent, Typography, Box, Button, CardOverflow, Snackbar } from '@mui/joy';
import Badge from '@mui/joy/Badge';
import { useInventory } from '../context/inventoryContext';
import { useSnackbar } from '../context/snackBarContext';

export default function Item({ id, name, image, variants = [] }) {
  const {processProductsChange} = useInventory();
  const {showSnackbar} = useSnackbar();

  const [updated, setUpdated] = useState(() => {
    const initialMap = {};
    variants.forEach(v => {
      initialMap[v.id] = 0;
    });
    return initialMap;
  });

  const [ifChanged, setIfChanged] = useState(true);

  function handleCounterChange(id, count) {
    setUpdated(prev => ({
      ...prev,
      [id]: count
    }));
    
    setIfChanged(false);
  }

  function handlePatch(){
    const status = processProductsChange(updated);
    
    
    if (status){
      showSnackbar('Pomyślnie zaktualizowano produkt!');
      setIfChanged(true);
      
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", cardChange: "row" },
        alignItems: "stretch",
        maxWidth: 1600,
        mx: 'auto',
        my: 1,
        p: 0,
        gap: 0,
        overflow: "hidden",
        borderRadius: "lg",
      }}
    >

      <CardOverflow
        sx={{
          flexShrink: 0,
          width: { xs: '100%', cardChange: 'auto' },
          height: { xs: 'auto', cardChange: 180 },
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <Box
          component="img"
          src={`${API_URL}${image}`}
          alt={name}
          sx={{
            objectFit: 'cover',
            height: '100%',
            width: 'auto',
          }}
        />
      </CardOverflow>

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          px: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', cardChange: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
            pt: 1.5,
            pb: 1.5,
          }}
        >
          <Typography level="h4" sx={{ fontWeight: 600, flex: 1 }}>
            {name}
          </Typography>
          <Badge badgeContent="!" invisible={ifChanged}>
            <Button size="sm" onClick={handlePatch}>
              Zatwierdź zmiany
            </Button>
          </Badge>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            alignItems: "center",
            my: 1
          }}
        >
          {variants.map((variant) => (
            <Counter
              key={variant.id}
              id = {variant.id}
              size={variant.size}
              amount={variant.count}
              onChange={handleCounterChange}
              sx={{
                flex: '1 0 60px',
                maxWidth: '80px',
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}