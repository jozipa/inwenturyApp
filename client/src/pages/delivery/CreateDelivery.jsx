import { useState, useMemo } from 'react';
import * as React from 'react'
import { useInventory } from '../../context/inventoryContext.jsx';
import { useSnackbar } from '../../context/snackBarContext.jsx';
const API_URL = import.meta.env.VITE_API_URL;
import CssBaseline from '@mui/joy/CssBaseline';
import MainHeader from '../../components/MainHeader.jsx';
import { fetchGeneratedDelivery, addNewDelivery } from '../../api/productsApi.js';
import NumberInput from '../../components/NumberInput.jsx';

import {
    ListItemContent,
    ListItemDecorator,
    Autocomplete,
    AutocompleteOption,
    Box,
    Button,
    IconButton,
    Input,
    Sheet,
    Table,
    Typography,
} from '@mui/joy';
import ClearIcon from '@mui/icons-material/Clear';


export default function CreateDelivery() {
    const { showSnackbar } = useSnackbar();
    const {allProducts} = useInventory();
    const [delivery, setDelivery] = useState([]);
    const [description, setDescription] = useState('');
    const [inputValue, setInputValue] = useState('');

    async function createDelivery() {
        const products = delivery.map((product) => {
            return { id: product.id, orderedQuantity: product.deliveryQuantity }
        })

        const response = await addNewDelivery(products, description);
        if (response) {
            showSnackbar("Pomyślnie zlecono dostawę");
            setDelivery([]);
        } else {
            showSnackbar("Nie udało się zlecić dostawy!", "danger");
        }
    }

    function addToDelivery(selectedProduct){
        console.log(delivery);
                
        if (delivery.find((el) => el.id == selectedProduct.id)){
            console.log('juz dodany');
            return
        }
        const newObject = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            size: selectedProduct.size,
            currentQuantity: selectedProduct.count,
            expectedQuantity: selectedProduct.expected_quantity,
            deliveryQuantity: Math.max(0,selectedProduct.expected_quantity-selectedProduct.count),
            imageUrl: selectedProduct.imageUrl,
            pendingQuantity: 0,
        }
        setDelivery([
            ...delivery,
            newObject
        ])
        

      
        
    }

    function changeDeliveryAmouont(id, value){
        setDelivery(delivery.map((product)=> {
            if (product.id==id){
                return {
                    ...product,
                    deliveryQuantity: value
                }
            }
            return product
        }));
    }

    function deleteFromDelivery(id){
        setDelivery(l => l.filter(item => item.id != id));
    }

    async function generateDelivery() {
        const deliveryProducts = await fetchGeneratedDelivery();
        
        setDelivery(deliveryProducts);
    }

    return (
        <React.Fragment>
            <CssBaseline />
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
                <MainHeader info={"Stwórz dostawę"}></MainHeader>
                <Box sx={{display: 'flex',flexDirection: 'row', gap: 1}}>
                    <Autocomplete
                        placeholder="Wyszukaj przedmiot"
                        sx={{ width: '80%' }}
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
                                setInputValue('');
                                addToDelivery(selectedProduct);
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

                    <Button onClick={() => { generateDelivery() }}>Generuj</Button>
                </Box>
                
                <Sheet
                    variant="outlined"
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        borderRadius: 'sm',
                        bgcolor: 'background.surface',
                    }}
                >
                    <Table stickyFooter stickyHeader sx={{ '& thead th:nth-of-type(2)': { width: '30%' }, borderRadius: '20%' }}>
                        <thead>
                            <tr>
                                <th>Zdjęcie</th>
                                <th>Nazwa</th>
                                <th>Rozmiar</th>
                                <th>Stan</th>
                                <th>Dostawa</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {delivery.map((product) => (
                                <tr key={product.id}>
                                    <td><img
                                        loading="lazy"
                                        width="40"
                                        src={`${API_URL}${product.imageUrl}`}
                                        alt="niezaladowano"
                                    /></td>
                                    <td>{product.name}</td>
                                    <td>{product.size}</td>
                                    <td>{product.currentQuantity}</td>
                                    <td><NumberInput valueChangeFun={(value) => changeDeliveryAmouont(product.id, value)} defaultValue={product.deliveryQuantity}></NumberInput></td>
                                    <td><Button variant='outlined' onClick={()=>{deleteFromDelivery(product.id)}} color='danger' ><ClearIcon/></Button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}></td>
                                <td><Button onClick={() => { createDelivery() }}>Zatwierdź</Button></td>
                            </tr>
                        </tfoot>
                    </Table>
                </Sheet>
            </Box>
        </React.Fragment>
    );

}