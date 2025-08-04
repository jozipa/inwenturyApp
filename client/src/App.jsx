import theme from './theme/theme';
import { CssVarsProvider } from '@mui/joy/styles';

import CssBaseline from '@mui/joy/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import AddItemPage from './pages/AddItemPage';
import InventPage from './pages/InventPage';
import RaportsPage from './pages/RaportsPage';

function App() {
    return (
      <CssVarsProvider theme={theme} disableTransitionOnChange>
        <CssBaseline />
        
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<InventPage />} />
            <Route path="inventory" element={<InventPage />} />
            <Route path="newItem" element={<AddItemPage />} />
            <Route path="raports" element={<RaportsPage />} />
          </Route>
        </Routes>
      </CssVarsProvider>
  );
}

export default App;