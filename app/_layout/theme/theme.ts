import { alpha, createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ebaf1a',
      dark: '#e78104',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e76f34',
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
    neutral: {
      main: '#899391',
      light: '#f5f5f5',
      dark: '#414347',
      contrastText: '#ffffff',
    }
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    h2: {
      fontSize: '1rem',
      fontWeight: '600',
    },
    h6: {
      fontSize: '1rem',
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
          fontSize: '0.875rem',
          borderRadius: '50px',
          padding:'4px 18px'
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '.MuiTableRow-root:hover': {
            background: alpha('#ebaf1a',0.08)
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        sizeMedium: {
          fontSize: '0.875rem',
        }
      }
    }
  }
});

export default theme;