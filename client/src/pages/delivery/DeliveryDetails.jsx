import { useState, useMemo, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as React from 'react'
import { useSnackbar } from '../../context/snackBarContext.jsx';
const API_URL = import.meta.env.VITE_API_URL;
import CssBaseline from '@mui/joy/CssBaseline';
import MainHeader from '../../components/MainHeader.jsx';
import { updateDelivery, fetchDeliveryById } from '../../api/productsApi.js';

import NumberInput from '../../components/NumberInput.jsx';



import {
    Chip,
    Box,
    Button,
    IconButton,
    Input,
    Sheet,
    Table,
    Typography,
    Breadcrumbs,
    Link
} from '@mui/joy';

export default function DeliveryDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [delivery, setDelivery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recievedProducts, setRecievedProducts] = useState({});

    const isDelivered = delivery?.status === "delivered";

    useEffect(() => {
        fetchDeliveryById(id)
            .then((data) => {
                setDelivery(data);
                initRecievedProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Błąd pobierania dostawy:", err);
                setLoading(false);
            });
    }, [id]);

    function initRecievedProducts(deliveryData) {
        if (!deliveryData?.items) return;

        const initialMap = {};
        for (const product of deliveryData.items) {
            initialMap[product.productId] = product.orderedQuantity;
        }
        
        setRecievedProducts(initialMap);

    }

    function changeRecievedById(productId, value) {
        setRecievedProducts((prev) => ({
            ...prev,
            [productId]: value,
        }));
    }

    async function deliveryReceivedUpdate() {
        const formattedData = Object.entries(recievedProducts).map(([prodId, quantity]) => ({
            id: Number(prodId),
            quantity,
        }));

        if (formattedData.length === 0) {
            showSnackbar("Nie wprowadzono ilości dostarczonych produktów", "danger");
            return;
        }

        try {
            const response = await updateDelivery(id, formattedData);
            if (response?.success) {
                showSnackbar("Pomyślnie zaktualizowano dostawę!", "success");
                setDelivery((prev) => ({
                    ...prev,
                    status: "delivered",
                    items: prev.items.map((item) => ({
                        ...item,
                        recievedQuantity: recievedProducts[item.productId] ?? item.orderedQuantity,
                    })),
                }));
            } else {
                showSnackbar("Nie udało się zaktualizować dostawy!", "danger");
            }
        } catch (err) {
            showSnackbar(err.message || "Błąd podczas aktualizacji dostawy!", "danger");
        }
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
                <MainHeader info={`Dostawa nr: ${id}`}></MainHeader>
                <Typography level='h4'>Status: {delivery?.status}</Typography>
                <Sheet
                    variant="outlined"
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        borderRadius: 'sm',
                        bgcolor: 'background.surface',
                        }}
                    >
                    <Table stickyFooter stickyHeader sx={{ borderRadius: '20%' }}>
                        <thead>
                            <tr>
                                <th>Zdjęcie</th>
                                <th>Nazwa</th>
                                <th>Rozmiar</th>
                                <th>Zamówiono</th>
                                <th>Dostarczono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {delivery?.items.map((product) => (
                                <tr key={product.productId}> 
                                    <td><img
                                        loading="lazy"
                                        width="40"
                                        src={`${API_URL}${product.imageUrl}`}
                                        alt="niezaladowano"
                                    /></td>
                                    <td>{product.name}</td>
                                    <td>{product.size}</td>
                                    <td>{product.orderedQuantity}</td>
                                    <td>{isDelivered ? (
                                            product.recievedQuantity
                                        ) : <NumberInput valueChangeFun={(nevVal) => changeRecievedById(product.productId,nevVal)} defaultValue={product.orderedQuantity}/>}</td>                        
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}></td>
                                <td>{!isDelivered && <Button onClick={deliveryReceivedUpdate}>Zatwierd dostawę</Button>}</td>
                            </tr>
                        </tfoot>
                    </Table>
                </Sheet>
            </Box>
        </React.Fragment>
    );

}