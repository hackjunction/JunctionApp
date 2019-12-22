import React from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotWrapper: {
        padding: '20px 6px',
        cursor: 'pointer',
    },
    dot: {
        width: '20px',
        height: '6px',
        background: 'rgba(0,0,0,0.4)',
        transition: 'all 0.2s ease',
    },
    dotActive: {
        background: 'rgba(0,0,0,0.8)',
    },
}))

const Pagination = ({ pages, active, onChange }) => {
    const classes = useStyles()
    if (pages < 2) {
        return null
    }
    return (
        <Box className={classes.wrapper}>
            {Array(pages)
                .fill(0)
                .map((item, index) => (
                    <Box
                        key={index}
                        className={classes.dotWrapper}
                        onClick={() => onChange(index)}
                    >
                        <Box
                            className={clsx(classes.dot, {
                                [classes.dotActive]: active === index,
                            })}
                        />
                    </Box>
                ))}
        </Box>
    )
}

export default Pagination
