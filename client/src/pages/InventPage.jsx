import { useState, useEffect } from 'react';
import * as React from 'react'

import FilterItems from '../components/FilterItems.jsx';
import Item from '../components/Item.jsx';


import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';


import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';





function InventPage() {
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
        <Box sx={{ display: 'flex', height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
          <Box
            sx={{
              px: { xs: 2, md: 4 },
              pt: 0,
              pb: 10,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: "100%",
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
                my: 2,
                gap: 1,
                flexDirection: { xs: 'column', xsm: 'row' },
                alignItems: { xs: 'start', xsm: 'center' },
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="h1" component="h1">
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
                <Box sx={{overflowY: 'auto', height: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 'md', px: 1}}>
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

export default InventPage;