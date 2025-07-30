import { useState } from 'react';

import { Button, Card, CardContent } from '@mui/joy';
import Drawer from '@mui/joy/Drawer';
import Typography from '@mui/joy/Typography';
import CardActions from '@mui/joy/CardActions';


import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/icons-material/Menu';



export default function Header() {
    const [open, setOpen] = useState(false)

    function handleDrawer(status){
       setOpen(!status) 
    }

  return (
    <Card variant='plain' borderRadius='none' sx={{width: "100%", height: "70px", m: 0}}>
        <IconButton sx={{width: "40px"}} onClick={() => {handleDrawer(open)}}>
            <Menu />
        </IconButton>
        <Drawer
            anchor="left"
            color="neutral"
            invertedColors
            size="md"
            variant="plain"
            open={open}
            >
            <Button onClick={() => {handleDrawer(open)}}>Wróć</Button>
        </Drawer>
    </Card>
  );
}
