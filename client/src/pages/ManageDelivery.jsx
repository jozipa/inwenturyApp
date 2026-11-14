import { useState, useMemo, useEffect } from 'react';
import * as React from 'react'
import { useInventory } from '../context/inventoryContext.jsx';
import { useSnackbar } from '../context/snackBarContext.jsx';
const API_URL = import.meta.env.VITE_API_URL;
import CssBaseline from '@mui/joy/CssBaseline';
import MainHeader from '../components/MainHeader.jsx';
import { fetchDeliveries } from '../api/productsApi.js';


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

export default function ManageDelivery() {
    const { showSnackbar } = useSnackbar();
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeliveries()
          .then((data) => {
            setDeliveries(data || []);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Nie udało się załadować danych:', err);
            setLoading(false);
          });  
      }, []);

      setTimeout(() => {
        console.log(deliveries);
        
      }, 2000);


    function getColor(status){
        console.log(status);
        
        switch (status) {
            case "pending":
                return "warning"
            case "ordered":
                return "primary";
            case "canceled":
                return "danger";
        }
        return "neutral";
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
                <MainHeader info={"Dostawy"}></MainHeader>
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
                                <th>Id</th>
                                <th>Wysłano</th>
                                <th>Status</th>
                                <th>Dostarczono</th>
                            </tr>
                        </thead>
                        <tbody>
                        {deliveries.map((delivery) => (
                            <tr key={delivery.delivery_id}> 
                                <td>{delivery.delivery_id}</td>
                                <td>{delivery.created_at}</td>
                                <td><Chip color={getColor(delivery.status)} variant='soft'>{delivery.status}</Chip></td>
                                <td>{delivery?.recieved_at || "-"}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}></td>
                            </tr>
                        </tfoot>
                    </Table>
                </Sheet>
            </Box>
        </React.Fragment>
    );

}