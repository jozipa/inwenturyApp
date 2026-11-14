import theme from './theme/theme';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/inventoryContext';
import { SnackbarProvider } from './context/snackBarContext';

import MainLayout from './layout/MainLayout';
import AddItemPage from './pages/AddItemPage';
import InventPage from './pages/InventPage';
import RaportsPage from './pages/RaportsPage';
import SalePage from './pages/SalePage.jsx';
import DeliverySettings from './pages/DeliverySettings.jsx';
import CreateDelivery from './pages/CreateDelivery.jsx';
import ManageDelivery from './pages/ManageDelivery.jsx';

function App() {
    return (
      <CssVarsProvider theme={theme} disableTransitionOnChange>
        <CssBaseline />
        <SnackbarProvider>
        <InventoryProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<InventPage />} />
                  <Route path="inventory" element={<InventPage />} />
                  <Route path="newItem" element={<AddItemPage />} />
                  <Route path="raports" element={<RaportsPage />} />
                  <Route path="sale" element={<SalePage />} />
                  <Route path="newDelivery" element={<CreateDelivery />} />
                  <Route path="deliverySettings" element={<DeliverySettings />} />
                  <Route path="manageDelivery" element={<ManageDelivery />}/>
                </Route>
              </Routes>
        </InventoryProvider>
       </SnackbarProvider>
      
      </CssVarsProvider>
  );
}

export default App;