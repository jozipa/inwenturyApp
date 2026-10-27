import { useState, useMemo } from 'react';
import * as React from 'react'
import { useInventory } from '../context/inventoryContext.jsx';

import FilterItems from '../components/FilterItems.jsx';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';



function SalePage() {
    const { allProducts, loading } = useInventory();
    const [query, setQuery] = useState('');

    const visibleItems = useMemo(() => {
      const code = (query ?? '').toLowerCase().split(' ').filter(w => w.trim() !== '');

      if (code.length==0){
        return []
      }


      return allProducts.find(item => {
        const text = `${item.name} ${item.barcode ?? ''}`.toLowerCase();
        return words.every(w => text.includes(w));
      });
    }, [groupedProducts, query]);
    
    if (loading) return <Typography>Ładowanie zasobów...</Typography>;

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
                Sprzedaż
              </Typography>
            </Box>

             
            <FilterItems onSearch={ setQuery }></FilterItems>
                
            
               
            
          </Box>
        </Box>
      </React.Fragment>
  );
}

export default InventPage;