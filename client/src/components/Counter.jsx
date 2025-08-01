import { useState } from 'react';

import { Card, CardContent } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import CardActions from '@mui/joy/CardActions';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

import {Box} from '@mui/joy';

import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';



export default function Counter({ amount, size, onChange}) {
  const [counter, setCounter] = useState(amount);

  const handleChange = (val) => {
    setCounter(val);
    if (onChange) onChange(size, val);
  };

  return (
    <Card
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        p: 0,
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 0, // <-- kluczowe
      }}
    >
  <Chip
    variant="plain"
    size="sm"
    sx={{
      position: "absolute",
      top: -10,
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: "md",
      px: 2,
      color: 'text.primary',
      bgcolor: 'inherit',
      border: '2px solid',
      borderColor: 'common.white',
      zIndex: 2
    }}
  >
    {size}
  </Chip>

  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      mt: 1,
      p: 0.5,
      pt: 0.7,
    }}
  >
    <Typography
      sx={{
        m: 0,
        p: 0,
        lineHeight: 1,
      }}
      level="body-lg"
      fontWeight={600}
    >
      {counter}
    </Typography>
  </Box>

  <CardActions
    sx={{
      justifyContent: "center",
      gap: 0.5,
      m: 0,
      px: 0.5,
      pb: 0.5,
      height: "auto",
    }}
  >
    <IconButton
      size="xs"
      sx={{ p: 0.8 }}
      variant="soft"
      onClick={() => handleChange(counter - 1)}
    >
      <Remove fontSize="sm" />
    </IconButton>
    <IconButton
      size="xs"
      sx={{ p: 0.8 }}
      variant="solid"
      onClick={() => handleChange(counter + 1)}
    >
      <Add fontSize="sm" />
    </IconButton>
  </CardActions>
</Card>
  );
}
