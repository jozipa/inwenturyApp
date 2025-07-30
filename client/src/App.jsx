import { useState, useEffect } from 'react';

import theme from './theme/theme';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import InwentView from './views/InwentView';
import Header from './components/Header';

function App() {


    return (
      <CssVarsProvider theme={theme} disableTransitionOnChange>
          <Header />
          <InwentView />
      </CssVarsProvider>
  );
}

export default App;