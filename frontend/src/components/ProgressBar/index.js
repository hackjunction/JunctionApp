import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'

import {
    Popover,
    IconButton,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Divider,
} from '@material-ui/core'

// JUST FOR TESTING, DON'T KEEP IN FINAL PRODUCT! //
var userProg = 36
var userNeed = 100
var userLvl = 0
////////////////////////////////////////////////////

const useStyles = makeStyles(theme => ({
    wrapperBar: {
        width: '60%',
        height: '48px',
        display: 'flex',
    },
    progBar: {
        width: '70%',
        height: '100%',
        background: 'gray',
    },
    lvlText: {
        fontSize: '26px',
        color: 'black',
        textShadow: '0 0 6px silver',
        padding: '15px',
        marginTop: '-10px',
    },
    progBarfill: {
        width: (userProg / userNeed) * 100 + '%',
        height: '100%',
        background: 'rgb(207, 134, 25)',
        boxShadow: 'inset 0 0 6px 2px rgb(163, 105, 18)',
    },
}))

export default () => {
    const classes = useStyles()
    return (
        <div className={classes.wrapperBar}>
            <span className={classes.lvlText}>PROGRESS: {userProg}%</span>
            <div className={classes.progBar}>
                <div className={classes.progBarfill}></div>
            </div>
            <span className={classes.lvlText}>LVL: {userLvl}</span>
        </div>
    )
}
