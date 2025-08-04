import { useState, useEffect } from 'react';

import { Box, Input, Button, Select, Option, Typography } from '@mui/joy';


import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';


export default function RaportsPage() {

  return (
    <Box
        sx={{
            display: 'flex',
            pt: 0,
            px: 2,
            bgcolor: '#f5f7fa',
            height: 'calc(100vh - 70px)',
            border: '1px solid',
            borderColor: 'divider',
            flexDirection: "column"
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
                Raporty
              </Typography>
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
                placeholder="Search"
                size="lg"
                variant="outlined"
                onChange={(e) => handleChange(e.target.value)}
            />
            
    </Box>
  );
}