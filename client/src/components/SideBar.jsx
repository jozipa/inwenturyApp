import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Typography,
  Sheet
} from '@mui/joy';


import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';
import SummarizeIcon from '@mui/icons-material/Summarize';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: {
          xs: '100%',     // pełna szerokość na bardzo małych ekranach (do Drawer)
          sm: 220,        // małe ekrany
          md: 260,        // średnie ekrany
          lg: 280,        // większe ekrany
        },
        height: '100vh',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.body',
        transition: 'width 0.3s ease-in-out',
      }}
    >

      <Typography level="h4" textAlign="center" mb={2}>
        Grodzka 29
      </Typography>


      <List
        size="lg"
        sx={{
          '--ListItem-radius': '8px',
          '--List-gap': '4px',
          flexGrow: 1,
        }}
      >
        <ListItem>
          <ListItemButton component={RouterLink} to="/sale">
            <ListItemDecorator>
              <StoreIcon />
            </ListItemDecorator>
            Sprzedaż
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={RouterLink} to="/inventory">
            <ListItemDecorator>
              <DashboardIcon />
            </ListItemDecorator>
            Inwentaryzacja
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={RouterLink} to="/raports">
            <ListItemDecorator>
              <SummarizeIcon />
            </ListItemDecorator>
            Raporty
          </ListItemButton>
        </ListItem>


        <ListItem>
          <ListItemButton component={RouterLink} to="/newItem">
            <ListItemDecorator>
              <AddBoxIcon />
            </ListItemDecorator>
            Dodaj produkt
          </ListItemButton>
        </ListItem>

        <ListItem nested>
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemDecorator>
              <LocalShippingIcon />
            </ListItemDecorator>
            Dostawy
          </ListItemButton>
          {open && (<List>
            <ListItem>
              <ListItemButton component={RouterLink} to="/deliverySettings">
                <ListItemDecorator>
                  <SettingsIcon />
                </ListItemDecorator>
                Ustawienia
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={RouterLink} to="/newDelivery">
                <ListItemDecorator>
                  <LocalShippingIcon />
                </ListItemDecorator>
                Nowa Dostawa
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={RouterLink} to="/manageDelivery">
                <ListItemDecorator>
                  <LocalShippingIcon />
                </ListItemDecorator>
                Zarzadzaj
              </ListItemButton>
            </ListItem>
          </List>)}
        </ListItem>


      </List>
    </Sheet>
  );
}