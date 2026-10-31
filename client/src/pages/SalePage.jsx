import { useState, useMemo } from 'react';
import * as React from 'react'
import { useInventory } from '../context/inventoryContext.jsx';
import { useSnackbar } from '../context/snackBarContext';

const API_URL = import.meta.env.VITE_API_URL;

import Autocomplete, {createFilterOptions} from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';

import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import ClearIcon from '@mui/icons-material/Clear';



export default function SalePage() {
    const { allProducts, processProductsFromCartSale, loading } = useInventory();
    const {showSnackbar} = useSnackbar();
    const [amount, setAmount] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [cart, setCart] = useState([]);

    function deleteFromCart(selectedProduct){
      setCart(l => l.filter(item => item.id != selectedProduct.id));
    }

    async function handleReceipt(){
      const parsedCart = cart.map((el) => {
        return {id: el.id, count: el.amount, date: Date.now()};
      });
      const response = await processProductsFromCartSale(parsedCart);
      if (response){
        setCart([]);
        showSnackbar("Pomyslnie zaktualizowano stan produktów!");
      } else {
        showSnackbar("Nie udało się zaktualizować stanu produktów!", "danger");
      }
    }

    function addToCart(selectedProduct){
      const selectedProductInCart = cart.find((el) => el.id == selectedProduct.id);
      const newProductObj = {...selectedProduct, amount: amount};
      if (!selectedProductInCart){
        setCart([
        newProductObj,
        ...cart,
      ])
      } else {
        const newCart = cart.map((el) => {
          if (el.id==selectedProductInCart.id){
            return {...el, amount: el.amount+1}
          } else {
            return el
          }
        })
        setCart(newCart);
      }
    }

    
    if (loading){
      return <Typography>Ładowanie zasobów...</Typography>;
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
                flexDirection: { xs: 'column' },
                alignItems: { xs: 'start'},
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="h1" component="h1">
                Sprzedaż
              </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                my: 2,
                gap: 1,
                flexDirection: { xs: 'row' },
                alignItems: { xs: 'start'},
                flexWrap: 'wrap',
              }}>
              <Autocomplete
                placeholder="Wyszukaj przedmiot"
                sx={{ width: 700 }}
                inputValue={inputValue}
                options={allProducts}
                getOptionLabel={(option) => `${option.name} Rozmiar: ${option.size}`}
                onInputChange={(event, value) => {
                  
                  if (event?.type == 'change'){
                    setInputValue(value)
                  }
                }}
                onChange={(event, selectedProduct) => {
                  if (selectedProduct){
                    console.log('chango');
                    
                    setInputValue('');
                    addToCart(selectedProduct);
                  } 
                }}

              renderOption={(props, option) => {
                const { key, ...otherProps } = props;

                return (
                  <AutocompleteOption key={option.id} {...otherProps}>
                    <ListItemDecorator>
                      <img
                        loading="lazy"
                        width="40"
                        src={`${API_URL}${option.imageUrl}`}
                        alt="niezaladowano"
                      />
                    </ListItemDecorator>
                    <ListItemContent sx={{ fontSize: 'md' }}>
                      {option.name} 
                      <Typography level="body-xs">
                        Rozmiar: {option.size}
                      </Typography>
                    </ListItemContent>
                  </AutocompleteOption>
              )}}
            />
            <Select value={amount} onChange={(e, newValue) => {setAmount(newValue)}}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
            </Select>
          </Box>

            <Table sx={{ '& thead th:nth-of-type(2)': { width: '40%' } }}>
              <thead>
                <tr>
                  <th>Zdjęcie</th>
                  <th>Nazwa</th>
                  <th>Rozmiar</th>
                  <th>Ilość</th>
                  <th>Usuń</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td><img
                        loading="lazy"
                        width="40"
                        src={`${API_URL}${product.imageUrl}`}
                        alt="niezaladowano"
                      /></td>
                    <td>{product.name}</td>
                    <td>{product.size}</td>
                    <td>{product.amount}</td>
                    <td><Button variant='outlined' onClick={()=>{deleteFromCart(product)}} color='danger' ><ClearIcon/></Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Box sx={{mg:2, display: 'flex',justifyContent: 'flex-end'}}>
                <Button onClick={() => {setCart([])} } color='danger'>Anuluj</Button>
                <Button onClick={() => {handleReceipt()}}>Zatwierdź</Button>
            </Box>
          </Box>
        </Box>
      </React.Fragment>
  );
}
