import { useState } from 'react';
import { Box } from '@mui/joy';
import { Outlet, Link as RouterLink } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Sidebar from '../components/SideBar.jsx';

import InventPage from '../pages/InventPage.jsx';
import AddItemPage from '../pages/AddItemPage.jsx';


 export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
  


    const toggleSidebar = () => setSidebarOpen(prev => !prev);


    return (
      <Box sx={{display: 'flex', flexDirection: "column", height: '100vh', overflow: 'hidden'}}>
          <Header onToggleSidebar={toggleSidebar}/>
          <Box sx={{display: 'flex', flexDirection: "row", p: 0, m: 0,  height: 'calc(100vh - 70px)', overflowY: 'hiddden'}}>
            
            {sidebarOpen && <Sidebar />}
            <Box sx={{flexGrow: 1}}>
              <Outlet />
            </Box>
            
          </Box>
          
          
          
      </Box>
  );
}

