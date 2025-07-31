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




export default function Sidebar({sho}) {
    const [show, setShow] = useState(sho)

  return (
    <Box
      show={show}
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
        {[
          { icon: <DashboardIcon />, label: 'Inwentaryzacja' },
          { icon: <AddBoxIcon />, label: 'Dodaj produkt' },
          { icon: <SettingsIcon />, label: 'Ustawienia' }
        ].map((item, index) => (
          <ListItem key={index}>
            <ListItemButton
              sx={{
                borderRadius: 'md',
                justifyContent: 'flex-start',
                px: 2,
                '&:hover': {
                  bgcolor: '#e1e7f0',
                  cursor: 'pointer'
                }
              }}
            >
              <ListItemDecorator>
                {item.icon}
              </ListItemDecorator>
              <Typography level="body-md">
                {item.label}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 2 }} />

        <ListItem sx={{ justifyContent: 'center' }}>
          <ListItemButton
            color="danger"
            sx={{
              borderRadius: 'md',
              justifyContent: 'flex-start',
              px: 2,
              '&:hover': {
                bgcolor: '#fdecea',
                cursor: 'pointer'
              }
            }}
          >
            <ListItemDecorator>
              <LogoutIcon />
            </ListItemDecorator>
            <Typography level="body-md" sx={{ ml: 1 }}>
              Wyloguj
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}