import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/joy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('success'); 

  const showSnackbar = (text, type = 'success') => {
    setMessage(text);
    setColor(type);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={2000}
        color={color}
        variant="solid"
        open={open}
        startDecorator={<CheckCircleIcon />}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}