import { createTheme } from '@mui/material/styles';
// Create a theme instance
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1E91D6',
        },
        secondary: {
            main: '#393E46',
        },
        bluee: {
            main: '#fc3d39',
        },
        background: {
            default: '#EEEEEE',
            paper: '#EEEEEE',
        },
    },
});

export default theme;