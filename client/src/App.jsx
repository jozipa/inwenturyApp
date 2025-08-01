import { useState, useEffect } from 'react';

import theme from './theme/theme';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import InwentView from './views/InwentView';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import { Box } from '@mui/joy';
import AddForm from './components/NewItemForm';



function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
  
    const [proviNavi, setProviNavi] = useState(false)

    function naviForm(){
      setProviNavi(true)
    }

    function naviInvert(){
      setProviNavi(false)
    }

    const toggleSidebar = () => setSidebarOpen(prev => !prev);


    return (
      <CssVarsProvider theme={theme} disableTransitionOnChange>

          <Header onToggleSidebar={toggleSidebar}/>
          <Box sx={{display: 'flex', flexDirection: "row", p: 0, m: 0,  height: 'calc(100vh - 70px)', overflowY: 'hiddden'}}>
            
            {sidebarOpen && <Sidebar naviFor={naviForm} naviInve={naviInvert}/>}
            <Box sx={{flexGrow: 1}}>
              <InwentView />
            </Box>
            
          </Box>
        <AddForm />
   
          
          
      </CssVarsProvider>
  );
}

export default App;