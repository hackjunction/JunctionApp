import { createTheme } from '@material-ui/core/styles'

const titleFont = ['"Montserrat"', 'sans-serif'].join(',')
const bodyFont = ['"Lato"', 'sans-serif'].join(',')

const theme = createTheme({
    palette: {
        primary: {
            main: '#52d7af',
        },
        secondary: {
            main: '#f38100',
        },
        theme_success: {
            main: '#8BC34A',
            light: '#bef67a',
            dark: '#5a9216',
            contrastText: '#ffffff',
        },
        theme_black: {
            main: '#232323',
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
            fontWeight: '700',
        },
        subtitle1: {
            fontFamily: bodyFont,
            fontWeight: '400',
        },
        subtitle2: {
            fontFamily: bodyFont,
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
            fontSize: 100,
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
})

export default theme
