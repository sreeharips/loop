import { createTheme } from '@mui/material/styles';
 
const Theme = createTheme({
    props: {
        MuiButton: {
            // size: 'small',
        },
    },
    overrides: {},
    palette: {
        primary: {
            main: '#5569ff',
            light: '#5569ff',
            dark: '#5569ff',
            contrastText: '#fff',
        },
        secondary: {
            main: '#5569ff',
            light: '#5569ff',
            dark: '#5569ff',
            contrastText: '#fff',
        },
    },

    typography: {
        fontSize: '0.95rem',
        fontFamily: 'Roboto',
        h2: {
            fontSize: '.714285714285714rem',
            lineHeight: '1.6',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: '200px',
        },
        h6: {
            fontSize: '1.1rem',
            fontWeight: '200px',
        },
        caption: {
            fontWeight: 400,
            fontSize: '0.85rem',
            height: '0.85rem',
            lineHeight: 0,
            letterSpacing: 0,
            color: 'gray',
        },
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                sizeSmall: {
                    // Adjust spacing to reach minimal touch target hitbox
                    marginLeft: 4,
                    marginRight: 4,
                    padding: 12,
                    color: "black"
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    marginTop: 8,
                    marginBottom: 8,
                    height: 1,
                    // backgroundColor: '#52be7f',
                },
            },
        },
    },
});

export default Theme;