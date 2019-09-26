import { createMuiTheme } from '@material-ui/core/styles';

const titleFont = ['"Montserrat"', 'sans-serif'].join(',');
const bodyFont = ['"Lato"', 'sans-serif'].join(',');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#52d7af'
        },
        secondary: {
            main: '#f38100'
        }
    },
    typography: {
        fontFamily: bodyFont,
        fontWeightRegular: 300,
        h1: {
            fontFamily: titleFont
        },
        h2: {
            fontFamily: titleFont
        },
        h3: {
            fontFamily: titleFont
        },
        h4: {
            fontFamily: titleFont
        },
        h5: {
            fontFamily: titleFont
        },
        h6: {
            fontFamily: titleFont
        }
    }
});

export default theme;
