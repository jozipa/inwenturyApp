import { useState } from 'react';
import Counter from './Counter'; 
const API_URL = import.meta.env.VITE_API_URL;
import { Card, CardContent, Typography, Box, Button, AspectRatio, CardOverflow, Snackbar } from '@mui/joy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Badge from '@mui/joy/Badge';


export default function Item({ id ,name, image, count = {}, type }) {
  const [updated, setUpdated] = useState(count);
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState(null)
  const [ifChanged, setIfChanged] = useState(true)

  function handleCounterChange(size, count) {
    setUpdated(prev => ({
      ...prev,
      [size]: count
    }));
    setIfChanged(false)
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
        console.log('Pomyślnie zaktualizowano element', data);
        let el = JSON.stringify(data.item.id)
        setSnackMessage(`Pomyślnie zaktualizowano produkt o id: ${el}`)
        setIfChanged(true)
        handleSnack()
      })
      .catch(err => {
        console.error('Błąd aktualizacji:', err);
      });
  }

  function handleSnack(){
    setSnackOpen(true)
    setTimeout(() => {
      setSnackOpen(false)
    }, 2000);
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
        height: { xs: 'auto', md: '180' },
      }}
    >
      <Snackbar
        anchorOrigin={{horizontal: "center", vertical: "top"}}
        autoHideDuration={2000}
        color="success"
        variant="solid"
        open={snackOpen}
        startDecorator={<CheckCircleIcon />}
      >
        {snackMessage}
      </Snackbar>
      <CardOverflow
        sx={{
          flexShrink: 0,
          width: { xs: '100%', md: 'auto' },
          height: { xs: 'auto', md: 180 }, // <-- kluczowe
          aspectRatio: { xs: '1', md: 'auto' },
          display: 'flex',
          alignItems: 'stretch',
          border: "1px solid",
          borderBlockColor: "black"
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
          p: 0
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
            mb: 0,
            flexWrap: 'wrap',
             border: "1px solid",
            borderBlockColor: "black",
            height: '50px',
            width: '100%'
          }}
        >
          <Typography
            level="h4"
            noWrap
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>
          <Badge badgeContent="!" invisible={ifChanged}>
            <Button
              size="sm"
              onClick={handlePatch}
              sx={{ whiteSpace: 'nowrap' }}
            >
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
            border: "1px solid",
            borderBlockColor: "black",
            height: "100%"
          }}
        >
          {Object.entries(count).map(([count, quantity]) => (
            <Counter
              key={count}
              size={count}
              amount={quantity}
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
