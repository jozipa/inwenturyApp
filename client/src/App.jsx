import { useState, useEffect } from 'react';

import theme from './theme/theme';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import InwentView from './views/InwentView';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import { Box } from '@mui/joy';



function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    return (
      <CssVarsProvider theme={theme} disableTransitionOnChange>
          <Header onToggleSidebar={toggleSidebar}/>
          <Box sx={{display: 'flex', flexDirection: "row", p: 0, m: 0}}>
            
            {sidebarOpen && <Sidebar />}
            <InwentView />
          </Box>
          
      </CssVarsProvider>
  );
}

export default App;