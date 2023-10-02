import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#fab40c',
      light: '#fff6d4',
      // dark: '#d9a641',
      contrastText: '#fff',
    },
    secondary: {
      main: '#DAD870',
      light: '#f0f2c9',
      dark: '#8c853a',
      contrastText: '#fff',
    },
    error: {
      main: '#cf4c4c',
      light: '#ffc4c4',
      dark: '#cf4c4c',
      contrastText: '#fff',
    },
    warning: {
      main: '#FF5C4D',
      light: '#ffd1c7',
      dark: '#d93e36',
      contrastText: '#fff',
    },
    info: {
      main: '#75e1ff',
      light: '#c7f7ff',
      dark: '#36abd9',
      contrastText: '#fff',
    },
    success: {
      main: '#DAD870',
      light: '#f0f2c9',
      dark: '#8c853a',
      contrastText: '#fff',
    }
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
          fontWeight: '600'
        },
        sizeMedium: {
          fontSize: '1rem'
        }
      }
    }
  }
});

export default theme;