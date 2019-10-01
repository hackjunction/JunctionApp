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
            fontFamily: titleFont,
            fontWeight: 'bold'
        },
        h2: {
            fontFamily: titleFont,
            fontWeight: 'bold'
        },
        h3: {
            fontFamily: titleFont,
            fontWeight: 'bold'
        },
        h4: {
            fontFamily: titleFont,
            fontWeight: 'bold'
        },
        h5: {
            fontFamily: titleFont,
            fontWeight: 'bold'
        },
        h6: {
            fontFamily: titleFont,
            fontWeight: 'bold'
        },
        subtitle1: {
            fontFamily: bodyFont,
            fontWeight: '300'
        },
        subtitle2: {
            fontFamily: bodyFont,
            fontWeight: '300'
        },
        body1: {
            fontFamily: bodyFont,
            fontWeight: '300'
        },
        body2: {
            fontFamily: bodyFont,
            fontWeight: '300'
        },
        button: {
            fontFamily: bodyFont,
            fontWeight: '300'
        },
        caption: {
            fontFamily: bodyFont,
            fontWeight: '300'
        },
        overline: {
            fontFamily: bodyFont,
            fontWeight: '300'
        }
    }
});

export default theme;
