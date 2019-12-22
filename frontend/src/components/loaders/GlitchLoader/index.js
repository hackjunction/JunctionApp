import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SVG from 'react-inlinesvg'

export default ({ size, title }) => {
    const classes = useStyles({ size })
    return (
        <div className={classes.root}>
            <div className={classes.logo}>
                <SVG
                    src={require('assets/logos/emblem.svg')}
                    className={clsx(classes.svg, classes.svg1)}
                >
                    <img
                        src={require('assets/logos/emblem_white.png')}
                        alt="logo"
                    />
                </SVG>
                <SVG
                    src={require('assets/logos/emblem.svg')}
                    className={clsx(classes.svg, classes.svg2)}
                ></SVG>
                <SVG
                    src={require('assets/logos/emblem.svg')}
                    className={clsx(classes.svg, classes.svg3)}
                ></SVG>
            </div>
            {title && (
                <div>
                    <h3 className={classes.title}>{title}</h3>
                    <h3 className={classes.title}>{title}</h3>
                    <h3 className={classes.title}>{title}</h3>
                </div>
            )}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    '@keyframes glitch1': {
        '0%': {
            transform: 'none',
            opacity: 1,
        },
        '7%': {
            transform: 'skew(-0.5deg, -0.9deg)',
            opacity: 0.75,
        },
        '10%': {
            transform: 'none',
            opacity: 1,
        },
        '27%': {
            transform: 'none',
            opacity: 1,
        },
        '30%': {
            transform: 'skew(0.8deg, -0.1deg)',
            opacity: 0.75,
        },
        '35%': {
            transform: 'none',
            opacity: 1,
        },
        '52%': {
            transform: 'none',
            opacity: 1,
        },
        '55%': {
            transform: 'skew(-1deg, 0.2deg)',
            opacity: 0.75,
        },
        '50%': {
            transform: 'none',
            opacity: 1,
        },
        '72%': {
            transform: 'none',
            opacity: 1,
        },
        '75%': {
            transform: 'skew(0.4deg, 1deg)',
            opacity: 0.75,
        },
        '80%': {
            transform: 'none',
            opacity: 1,
        },
        '100%': {
            transform: 'none',
            opacity: 1,
        },
    },
    '@keyframes glitch2': {
        '0%': {
            transform: 'none',
            opacity: 0.25,
        },
        '7%': {
            transform: 'translate(-2px, -3px)',
            opacity: 0.5,
        },
        '10%': {
            transform: 'none',
            opacity: 0.25,
        },
        '27%': {
            transform: 'none',
            opacity: 0.25,
        },
        '30%': {
            transform: 'translate(-5px, -2px)',
            opacity: 0.5,
        },
        '35%': {
            transform: 'none',
            opacity: 0.25,
        },
        '52%': {
            transform: 'none',
            opacity: 0.25,
        },
        '55%': {
            transform: 'translate(-5px, -1px)',
            opacity: 0.5,
        },
        '50%': {
            transform: 'none',
            opacity: 0.25,
        },
        '72%': {
            transform: 'none',
            opacity: 0.25,
        },
        '75%': {
            transform: 'translate(-2px, -6px)',
            opacity: 0.5,
        },
        '80%': {
            transform: 'none',
            opacity: 0.25,
        },
        '100%': {
            transform: 'none',
            opacity: 0.25,
        },
    },
    '@keyframes glitch3': {
        '0%': {
            transform: 'none',
            opacity: 0.25,
        },
        '7%': {
            transform: 'translate(2px, 3px)',
            opacity: 0.5,
        },
        '10%': {
            transform: 'none',
            opacity: 0.25,
        },
        '27%': {
            transform: 'none',
            opacity: 0.25,
        },
        '30%': {
            transform: 'translate(5px, 2px)',
            opacity: 0.5,
        },
        '35%': {
            transform: 'none',
            opacity: 0.25,
        },
        '52%': {
            transform: 'none',
            opacity: 0.25,
        },
        '55%': {
            transform: 'translate(5px, 1px)',
            opacity: 0.5,
        },
        '50%': {
            transform: 'none',
            opacity: 0.25,
        },
        '72%': {
            transform: 'none',
            opacity: 0.25,
        },
        '75%': {
            transform: 'translate(2px, 6px)',
            opacity: 0.5,
        },
        '80%': {
            transform: 'none',
            opacity: 0.25,
        },
        '100%': {
            transform: 'none',
            opacity: 0.25,
        },
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    svg1: {
        animation: '$glitch1 2.5s infite',
        '& path': {
            fill: 'white',
        },
    },
    svg2: {
        animation: '$glitch2 2.5s infinite',
        '& path': {
            fill: '#b200b7',
        },
    },
    svg3: {
        animation: '$glitch3 2.5s infinite',
        '& path': {
            fill: 'white',
        },
    },
    logo: ({ size }) => ({
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
    }),
    title: {
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 0,
        lineHeight: 0,
        animation: '$glitch1 2.5s infinite',
        '&:nth-child(2n)': {
            animation: '$glitch2 2.5s infinite',
            color: '#b200b7',
        },
        '&:nth-child(3n)': {
            animation: '$glitch3 2.5s infinite',
            color: 'white',
        },
    },
}))
