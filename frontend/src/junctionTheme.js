import { createTheme } from '@material-ui/core/styles'
// import HankenGrotesk_Regular from './assets/fonts/static/HankenGrotesk-Regular.ttf'
// import hanken from './assets/fonts/HankenGrotesk-Regular.ttf'
// import AkzidenzGroteskPro from './assets/fonts/AkzidenzGroteskPro-Regular.ttf'
const titleFont = ['"Inter"', 'sans-serif'].join(',')
const bodyFont = ['"Inter"', 'sans-serif'].join(',')

const theme = createTheme({
    palette: {
        primary: {
            main: '#6B09FF',
            dark: '#330080',
            light: '#a366ff',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f8a787',
            dark: '#f58356',
            light: '#fac0aa',
            contrastText: '#ffffff',
        },
        success: {
            main: '#34FACC',
            light: '#6afbd9',
            dark: '#06e0ad',
            contrastText: '#ffffff',
        },
        error: {
            main: '#e63900',
            light: '#ff794d',
            dark: '#b32d00',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#EAB059',
            light: '#f4d4a4',
            dark: '#e3931c',
            contrastText: '#ffffff',

        },
        theme_black: {
            main: '#232323',
        },
        theme_red: {
            main: '#ff5b5b',
        },
        theme_gray: {
            base: '#f7fafc',
            dark: '#e2e8f0',
        },
        theme_orange: {
            main: '#f58532',
            light: '#ffb661',
            dark: '#bc5700',
            contrastText: '#ffffff',
        },
        theme_blue: {
            main: '#73F9EC',
            light: '#8ffaff',
            dark: '#0b96a5',
            contrastText: '#232323',
        },
        theme_purple: {
            main: '#392F80',
            light: '#6959b0',
            dark: '#000953',
            contrastText: '#ffffff',
        },
        theme_turquoise: {
            main: '#58C7D6',
            light: '#8ffaff',
            dark: '#0b96a5',
            contrastText: '#ffffff',
        },
        theme_lightgray: {
            main: '#efefef',
            light: '#ffffff',
            dark: '#bdbdbd',
            contrastText: '#000000',
        },
        theme_lightgrayDark: {
            main: '#efefef',
            light: '#ffffff',
            dark: '#bdbdbd',
            contrastText: '#ffffff',
        },
        theme_white: {
            main: '#ffffff',
            light: '#ffffff',
            dark: '#ffffff',
            contrastText: '#000000',
        },
        background: {
            paper: '#fff',
            default: '#ffffff',
            level2: '#f5f5f5',
            level1: '#fff',
        },
        outlined_button: {
            main: '#ffffff',
            light: '#ffffff',
            dark: '#000000',
            contrastText: '#000000',
            lightBorder: '#e2e8f0',
        },
    },
    typography: {
        fontFamily: bodyFont,
        fontWeightRegular: 300,
        h1: {
            fontFamily: titleFont,
            fontWeight: '700',
        },
        h2: {
            fontFamily: titleFont,
            fontWeight: '700',
        },
        h3: {
            fontFamily: titleFont,
            fontWeight: '400',
        },
        h4: {
            fontFamily: titleFont,
            fontWeight: '400',
        },
        h5: {
            fontFamily: titleFont,
            fontWeight: '700',
        },
        h6: {
            fontFamily: titleFont,
            fontWeight: '500',
            lineHeight: '1.3',
        },
        subtitle1: {
            fontFamily: titleFont,
            fontWeight: '400',
        },
        subtitle2: {
            fontFamily: titleFont,
            fontWeight: '400',
        },
        body1: {
            fontFamily: bodyFont,
            fontWeight: '400',
        },
        body2: {
            fontFamily: bodyFont,
            fontWeight: '400',
        },
        button: {
            fontFamily: bodyFont,
            fontWeight: '400',
        },
        caption: {
            fontFamily: bodyFont,
            fontWeight: '400',
        },
        overline: {
            fontFamily: bodyFont,
            fontWeight: '400',
        },
    },
    spacing: 8,
})

export default theme
