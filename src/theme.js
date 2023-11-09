import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003087',
      light: '#778bef',
      dark: '#334cb2',
      contrastText: '#ffffff',
      disabled: '#80808050',
    },
    secondary: {
      main: '#19857b',
      light: '#4ba3a6',
      dark: '#136257',
      contrastText: '#000000',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
      hint: '#9e9e9e',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    divider: '#bdbdbd',
  },
  
  typography: {
    fontFamily: 'SofiaProRegular, Arial, sans-serif',
    h1: {
        fontFamily: 'SofiaProRegular, Arial, sans-serif',
      },
      h2: {
        fontFamily: 'SofiaProRegular, Arial, sans-serif',
      },
      h3: {
        fontFamily: 'SofiaProRegular, Arial, sans-serif',
      },    
      h4: {
        fontFamily: 'SofiaProRegular, Arial, sans-serif',
      },
      h5: {
        fontFamily: 'SofiaProRegular, Arial, sans-serif',
      },
      h6: {
        fontFamily: 'SofiaProRegular, Arial, sans-serif',
      },
  }
});

export default theme;
