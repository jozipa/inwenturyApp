import { extendTheme } from '@mui/joy/styles'; // dla Joy UI

const theme = extendTheme({
  breakpoints: {
    values: {
      xs: 0,
      xsm: 300,
      sm: 600,
      cardChange: 700,
      smd: 750,   
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;