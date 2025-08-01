import React from 'react';
import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Typography,
  Divider
} from '@mui/joy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';




export default function Sidebar({naviFor, naviInvrt}) {
    

  return (
    <Box

      sx={{
        width: '20%',
        height: '100vh',
        bgcolor: 'neutral.100',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography level="h4" mb={2}>
        Panel
      </Typography>

      <List
        size="lg"
        variant="plain"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
       <ListItem>
  <ListItemButton
    onClick={naviInvrt}
    sx={{
      borderRadius: 'md',
      justifyContent: 'flex-start',
      px: 2,
      '&:hover': {
        bgcolor: '#e1e7f0',
        cursor: 'pointer',
      },
    }}
  >
    <ListItemDecorator>
      <DashboardIcon />
    </ListItemDecorator>
    <Typography level="body-md">Inwentaryzacja</Typography>
  </ListItemButton>
</ListItem>

<ListItem>
  <ListItemButton
    onClick={naviFor}
    sx={{
      borderRadius: 'md',
      justifyContent: 'flex-start',
      px: 2,
      '&:hover': {
        bgcolor: '#e1e7f0',
        cursor: 'pointer',
      },
    }}
  >
    <ListItemDecorator>
      <AddBoxIcon />
    </ListItemDecorator>
    <Typography level="body-md">Dodaj produkt</Typography>
  </ListItemButton>
</ListItem>

<ListItem>
  <ListItemButton
    sx={{
      borderRadius: 'md',
      justifyContent: 'flex-start',
      px: 2,
      '&:hover': {
        bgcolor: '#e1e7f0',
        cursor: 'pointer',
      },
    }}
  >
    <ListItemDecorator>
      <SettingsIcon />
    </ListItemDecorator>
    <Typography level="body-md">Ustawienia</Typography>
  </ListItemButton>
</ListItem>
        
      </List>
    </Box>
  );
}