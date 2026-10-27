import { useState, useMemo } from 'react';
import * as React from 'react'
import { useInventory } from '../context/inventoryContext.jsx';

import FilterItems from '../components/FilterItems.jsx';
import Item from '../components/Item.jsx';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';


function InventPage() {
    const { groupedProducts, loading } = useInventory();
    const [query, setQuery] = useState('');

    const visibleItems = useMemo(() => {
      const words = (query ?? '').toLowerCase().split(' ').filter(w => w.trim() !== '');
      if (words.length === 0) return groupedProducts;

      return groupedProducts.filter(item => {
        const text = `${item.name} ${item.description ?? ''}`.toLowerCase();
        return words.every(w => text.includes(w));
      });
  }, [groupedProducts, query]);
    
    if (loading) return <Typography>Ładowanie magazynu...</Typography>;

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

             
                <FilterItems onSearch={ setQuery }></FilterItems>
                <Box sx={{overflowY: 'auto', height: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 'md', px: 1}}>
                  {visibleItems.map((item) => (  
                    <Item
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      image={item.imageUrl}
                      variants={item.variants}
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