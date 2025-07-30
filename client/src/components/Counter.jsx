import { useState } from 'react';

import { Card, CardContent } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import CardActions from '@mui/joy/CardActions';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';



export default function Counter({ amount, size, onChange, sx = {} }) {
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
      size="sm"
      sx={{
        p: 0.5,
        width: 80,
        minWidth: 70,
        textAlign: "center",
        ...sx, // pozwala nadpisywać styl z zewnątrz
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
        }}
      >
        {size}
      </Chip>


      <CardContent
        sx={{
          pt: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography level="body-lg" fontWeight={600}>
          {counter}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "center",
          gap: 0.5,
          p: 0.5,
        }}
      >
        <IconButton
          size="sm"
          variant="soft"
          onClick={() => handleChange(counter - 1)}
        >
          <Remove fontSize="small" />
        </IconButton>
        <IconButton
          size="sm"
          variant="solid"
          onClick={() => handleChange(counter + 1)}
        >
          <Add fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
