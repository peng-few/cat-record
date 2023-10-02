import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ebaf1a',
      dark: '#e78104',
      contrastText: 'white'
    },
    secondary: {
      main: '#e76f34',
    },
    background: {
      default: '#f5f5f5',
    },
    error: {
      main: '#cf4c4c',
    },
    warning: {
      main: '#FF5C4D',
    },
    success: {
      main: '#c1dee0',
    },
    info: {
      main: '#3777b5',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: '600',
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          boxShadow: '0 0 0',
          ":hover": {
            boxShadow: '0 0 0',
          }
        },
        sizeMedium: {
          fontSize: '1rem',
          borderRadius: '50px',
          padding:'5px 20px'
        }
      }
    }
  }
});

export default theme;