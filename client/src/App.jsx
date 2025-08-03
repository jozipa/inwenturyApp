import theme from './theme/theme';
import { CssVarsProvider } from '@mui/joy/styles';

import CssBaseline from '@mui/joy/CssBaseline';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import AddItemPage from './pages/AddItemPage';
import InventPage from './pages/InventPage';


function App() {
    return (
      <CssVarsProvider theme={theme} disableTransitionOnChange>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<InventPage />} />
            <Route path="inventory" element={<InventPage />} />
            <Route path="newItem" element={<AddItemPage />} />
          </Route>
        </Routes>
      </CssVarsProvider>
  );
}

export default App;