import { useState, useMemo } from 'react';
import * as React from 'react'
import { useInventory } from '../context/inventoryContext.jsx';
import { useSnackbar } from '../context/snackBarContext.jsx';
const API_URL = import.meta.env.VITE_API_URL;
import CssBaseline from '@mui/joy/CssBaseline';
import MainHeader from '../components/MainHeader.jsx';
import { fetchGeneratedDelivery, addNewDelivery } from '../api/productsApi.js';

import {
    Box,
    Button,
    IconButton,
    Input,
    Sheet,
    Table,
    Typography,
} from '@mui/joy';

export default function CreateDelivery() {
    const { showSnackbar } = useSnackbar();
    const [delivery, setDelivery] = useState([]);
    const [description, setDescription] = useState('');

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

                <Button onClick={() => { generateDelivery() }}>Generuj Dostawę</Button>
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
                                <th>Ilość</th>
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
                                    <td>{product.deliveryQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}></td>
                                <td><Button onClick={() => { createDelivery() }}>Zatwierdź</Button></td>
                            </tr>
                        </tfoot>
                    </Table>
                </Sheet>
            </Box>
        </React.Fragment>
    );

}