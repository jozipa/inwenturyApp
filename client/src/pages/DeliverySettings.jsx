import { useState, useMemo } from 'react';
import * as React from 'react'
import { useInventory } from '../context/inventoryContext.jsx';
import { useSnackbar } from '../context/snackBarContext.jsx';
const API_URL = import.meta.env.VITE_API_URL;
import CssBaseline from '@mui/joy/CssBaseline';
import { updateProductsExpectedQuantity } from '../api/productsApi.js';
import MainHeader from '../components/MainHeader.jsx';

import {
  Box,
  Button,
  IconButton,
  Input,
  Sheet,
  Table,
  Typography,
} from '@mui/joy';



function DeliverySettings() {
    const { allProducts, loading } = useInventory();
    const {showSnackbar} = useSnackbar();
    const [query, setQuery] = useState('');
    const [updated, setUpdated] = useState({});

    function handleCounterChange(id, count) {

      setUpdated(prev => ({
        ...prev,
        [id]: parseInt(count)
      }));
      
    }
    async function handleRequestsChange(){
        const formattedData = Object.entries(updated).map(([id, count]) => ({ id: Number(id), count }))
        if (formattedData.length == 0){
          showSnackbar("Nie masz rzeczy do zaktualizowania!", "warning");
          return
        }
        const response =  await updateProductsExpectedQuantity(formattedData);
        if (response){
          setUpdated([]);
          showSnackbar("Pomyslnie zaktualizowano produkty!");
        } else {
          showSnackbar("Nie udało się zaktualizować produktów!", "danger");
        }
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
            <MainHeader info={"Ustawienia Dostaw"}></MainHeader>

            <Sheet
            variant="outlined"
            sx={{
              flex: 1, 
              overflow: 'auto', 
              borderRadius: 'sm',
              bgcolor: 'background.surface',
            }}
          >
            <Table stickyFooter stickyHeader sx={{ '& thead th:nth-of-type(2)': { width: '40%' }, borderRadius: '20%' }}>
              <thead>
                <tr>
                  <th>Zdjęcie</th>
                  <th>Nazwa</th>
                  <th>Rozmiar</th>
                  <th>Oczekiwana ilość</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product) => (
                  <tr key={product.id}>
                    <td><img
                        loading="lazy"
                        width="40"
                        src={`${API_URL}${product.imageUrl}`}
                        alt="niezaladowano"
                      /></td>
                    <td>{product.name}</td>
                    <td>{product.size}</td>
                    <td><Input
                          type="number"
                          defaultValue={product.expected_quantity}
                          slotProps={{
                            input: {
                              min: 0,
                              max: 50,
                            },
                          }}
                          onKeyDown={(e) => {
                            if (['e', 'E', '+', '-',',','.'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {handleCounterChange(product.id, e.target.value)}}
                        /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>Suma</td>
                  <td><Button onClick={() => {handleRequestsChange()}}>Aktualizuj</Button></td>
                </tr>
              </tfoot>
            </Table>
          </Sheet>
          
          
               
            
          </Box>
        </Box>
      </React.Fragment>
  );
}

export default DeliverySettings;

