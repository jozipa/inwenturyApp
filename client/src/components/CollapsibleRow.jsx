import * as React from 'react';
import { useState } from 'react';
import {
  IconButton,
  Sheet,
  Table,
  Typography,
} from '@mui/joy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const API_URL = import.meta.env.VITE_API_URL;

export default function Row({ receipt, initialOpen = false }) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <React.Fragment>
      <tr onClick={() => setOpen(!open)}>
        <td style={{ width: 48, textAlign: 'center' }}>
          <IconButton
            aria-label="rozwiń wiersz"
            variant="plain"
            color="neutral"
            size="sm"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td>{receipt.created_at}</td>
        <td>{receipt.price} zł</td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={3}>
          {open && (
            <Sheet
              variant="soft"
              sx={{
                p: 1.5,
                bgcolor: 'background.level1',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography level="title-sm" sx={{ mb: 1, px: 0.5 }}>
                Pozycje paragonu #{receipt.receipt_id}
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="szczegóły pozycji"
                sx={{
                  bgcolor: 'background.surface',
                  '& > thead > tr > th:nth-child(n + 4), & > tbody > tr > td:nth-child(n + 4)':
                    { textAlign: 'right' },
                  '--TableCell-paddingX': '0.75rem',
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>Foto</th>
                    <th>Nazwa</th>
                    <th>Rozmiar</th>
                    <th>Ilość</th>
                    <th>Cena jedn.</th>
                    <th>Suma</th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.items?.map((item) => (
                    <tr key={item.productId}>
                      <td>
                        <img
                          loading="lazy"
                          width="36"
                          height="36"
                          style={{ objectFit: 'cover', borderRadius: '4px' }}
                          src={`${API_URL}${item.imageUrl}`}
                          alt={item.name}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.size}</td>
                      <td>{item.count} szt.</td>
                      <td>{Number(item.unitPrice).toFixed(2)} zł</td>
                      <td>
                        {(Number(item.count) * Number(item.unitPrice)).toFixed(2)} zł
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}