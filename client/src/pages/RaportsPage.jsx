import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  IconButton,
  Input,
  Sheet,
  Table,
  Typography,
} from '@mui/joy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { fetchReceipts } from '../api/productsApi.js';
import CollapsibbleRow from '../components/CollapsibleRow.jsx'

const API_URL = import.meta.env.VITE_API_URL;



export default function RaportsPage() {
  const [loading, setLoading] = useState(true);
  const [receipts, setReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReceipts()
      .then((data) => {
        setReceipts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Nie udało się załadować danych:', err);
        setLoading(false);
      });
  }, []);

  const filteredReceipts = receipts.filter((receipt) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      receipt.created_at?.toLowerCase().includes(query) ||
      receipt.receipt_id?.toString().includes(query) ||
      receipt.items?.some((item) => item.name?.toLowerCase().includes(query))
    );
  });

  const totalMoney = filteredReceipts.reduce((sum, item) => {
    return sum + (Number(item.price) || 0);
  }, 0);

  if (loading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography level="body-lg">Ładowanie...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 70px)',
        p: 3,
        bgcolor: '#f5f7fa',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h1">Raporty</Typography>
        <Button
          color="primary"
          startDecorator={<DownloadRoundedIcon />}
          size="sm"
        >
          Download PDF
        </Button>
      </Box>

      <Input
        color="neutral"
        placeholder="Szukaj po dacie, ID lub nazwie produktu..."
        size="md"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />


      <Sheet
        variant="outlined"
        sx={{
          flex: 1, 
          overflow: 'auto', 
          borderRadius: 'sm',
          bgcolor: 'background.surface',
        }}
      >
        <Table
          aria-label="tabela raportów"
          stickyHeader 
          stickyFooter
          hoverRow
          sx={{
            '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
              { textAlign: 'right' },
            '& > tbody > tr:nth-child(odd) > td': {
              borderBottom: 0,
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48 }} aria-label="przycisk rozwijania" />
              <th>Data</th>
              <th style={{ width: 140 }}>Kwota</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.map((receipt) => (
              <CollapsibbleRow key={receipt.receipt_id} receipt={receipt} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Suma</td>
              <td>{totalMoney.toFixed(2)} zł</td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </Box>
  );
}