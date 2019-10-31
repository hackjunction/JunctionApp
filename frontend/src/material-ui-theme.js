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
        },
        theme_success: {
            main: '#8BC34A',
            light: '#bef67a',
            dark: '#5a9216',
            contrastText: '#ffffff'
        },
        theme_orange: {
            main: '#f58532',
            light: '#ffb661',
            dark: '#bc5700',
            contrastText: '#ffffff'
        },
        theme_purple: {
            main: '#392F80',
            light: '#6959b0',
            dark: '#000953',
            contrastText: '#ffffff'
        },
        theme_turquoise: {
            main: '#58C7D6',
            light: '#8ffaff',
            dark: '#0b96a5',
            contrastText: '#ffffff'
        },
        theme_lightgray: {
            main: '#efefef',
            light: '#ffffff',
            dark: '#bdbdbd',
            contrastText: '#000000'
        },
        theme_white: {
            main: '#ffffff',
            light: '#ffffff',
            dark: '#ffffff',
            contrastText: '#000000'
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
