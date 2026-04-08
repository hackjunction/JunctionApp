import { createTheme } from '@material-ui/core/styles'
const titleFont = ['"Pixelify Sans"', 'sans-serif'].join(',')
const bodyFont = ['"IBM Plex Mono"', 'monospace'].join(',')

const theme = createTheme({
    palette: {
        primary: {
            main: '#4dffd1',
            dark: '#25c49a',
            light: '#7fffe0',
            contrastText: '#001d24',
        },
        secondary: {
            main: '#061126',
            dark: '#000000',
            light: '#2a3650',
            contrastText: '#ffffff',
        },
        success: {
            main: '#4dffd1',
            light: '#7fffe0',
            dark: '#25c49a',
            contrastText: '#001d24',
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
            contrastText: '#001d24',
        },
        theme_black: {
            main: '#001d24',
        },
        theme_red: {
            main: '#ff5b5b',
        },
        theme_gray: {
            base: '#0c2c34',
            dark: '#061126',
        },
        theme_orange: {
            main: '#f58532',
            light: '#ffb661',
            dark: '#bc5700',
            contrastText: '#ffffff',
        },
        theme_blue: {
            main: '#4dffd1',
            light: '#7fffe0',
            dark: '#25c49a',
            contrastText: '#001d24',
        },
        theme_purple: {
            main: '#529777',
            light: '#7ab89a',
            dark: '#3a6b54',
            contrastText: '#ffffff',
        },
        theme_turquoise: {
            main: '#4dffd1',
            light: '#7fffe0',
            dark: '#25c49a',
            contrastText: '#001d24',
        },
        theme_lightgray: {
            main: '#0c2c34',
            light: '#1a4a55',
            dark: '#001d24',
            contrastText: '#4dffd1',
        },
        theme_lightgrayDark: {
            main: '#0c2c34',
            light: '#1a4a55',
            dark: '#001d24',
            contrastText: '#4dffd1',
        },
        theme_white: {
            main: '#001d24',
            light: '#0c2c34',
            dark: '#000000',
            contrastText: '#ffffff',
        },
        background: {
            paper: '#0c2c34',
            default: '#001d24',
            level2: '#061126',
            level1: '#0c2c34',
        },
        outlined_button: {
            main: '#001d24',
            light: '#0c2c34',
            dark: '#4dffd1',
            contrastText: '#4dffd1',
            lightBorder: '#0c2c34',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.7)',
        },
    },
    typography: {
        fontFamily: bodyFont,
        fontWeightRegular: 400,
        h1: {
            fontFamily: titleFont,
            fontWeight: '700',
        },
        h2: {
            fontFamily: titleFont,
            fontWeight: '700',
        },
        h3: {
            fontFamily: bodyFont,
            fontWeight: '700',
        },
        h4: {
            fontFamily: bodyFont,
            fontWeight: '700',
        },
        h5: {
            fontFamily: bodyFont,
            fontWeight: '700',
        },
        h6: {
            fontFamily: bodyFont,
            fontWeight: '500',
            lineHeight: '1.3',
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
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: '#001d24',
                    color: '#ffffff',
                },
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: '#0c2c34',
                color: '#ffffff',
            },
        },
        MuiTypography: {
            root: {
                color: '#ffffff',
            },
        },
        MuiInputBase: {
            root: {
                color: '#ffffff',
            },
        },
        MuiOutlinedInput: {
            notchedOutline: {
                borderColor: '#0c2c34',
            },
        },
        MuiInputLabel: {
            root: {
                color: 'rgba(255,255,255,0.7)',
            },
        },
    },
})

export default theme
