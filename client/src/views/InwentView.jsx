import { useState, useEffect } from 'react';
import * as React from 'react'

import AddForm from '../components/NewItemForm.jsx';
import FilterItems from '../components/FilterItems.jsx';
import Item from '../components/Item.jsx';



import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';





function InwentView() {
  const [allItems, setAllItems] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/items')
      .then(res => res.json())
      .then(data => {
        setAllItems(data);
        setItems(data)
      });
  }, []);

  
  function filteredItems(itm){
    setItems(itm)
  }

    return (
      <React.Fragment>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100dvh', overflow: 'hidden' }}>
          <Box
            component="main"
            className="MainContent"
            sx={{
              px: { xs: 2, md: 4 },
              pt: 0,
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: "80vw",
              width: "auto",
              height: '100dvh',
              gap: 1,
              bgcolor: '#f5f7fa',
              border: '1px solid',
              borderColor: 'divider',
              
            }}
          >
            <Box
              sx={{
                display: 'flex',
                mb: 1,
                mt: 1,
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'start', sm: 'center' },
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="h2" component="h1">
                Inwentaryzacja
              </Typography>
              <Button
                color="primary"
                startDecorator={<DownloadRoundedIcon />}
                size="sm"
              >
                Download PDF
              </Button>
            </Box>

             
                <FilterItems its={allItems} onDelay={filteredItems}></FilterItems>
                <Box sx={{overflowY: 'auto'}}>
                  {items.map((item) => (  
                    <Item
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      image={item.imageUrl}
                      count={item.count}
                      type={item.type}
                    />
                  ))}
                </Box>
            
               
            
          </Box>
        </Box>
      </React.Fragment>
  );
}

export default InwentView;