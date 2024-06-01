import React, { useMemo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { findIndex } from 'lodash-es'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Tabs, Tab, Typography, Box, useMediaQuery } from '@material-ui/core'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </Typography>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    }
}

const useStyles = makeStyles(theme => ({
    root: ({ transparent }) => ({
        flexGrow: 1,
        width: '100%',
        backgroundColor: transparent
            ? 'transparent'
            : theme.palette.background.paper,
    }),
    wrapper: {
        textAlign: 'left',
        alignItems: 'flex-start',
    },
}))

export default ({ tabs, location, baseRoute, transparent = false }) => {
    const dispatch = useDispatch()
    const classes = useStyles({ transparent })

    const pushRoute = useCallback(
        path => {
            dispatch(push(`${baseRoute}${path}`))
        },
        [baseRoute, dispatch],
    )

    const handleChange = (event, newValue) => {
        pushRoute(tabs[newValue].path)
    }

    const activeIndex = useMemo(() => {
        const relativePath = location.pathname.replace(baseRoute, '')
        const idx = findIndex(tabs, item => item.path === relativePath)
        return idx
    }, [baseRoute, location.pathname, tabs])

    useEffect(() => {
        if (activeIndex === -1) {
            pushRoute(tabs[0].path)
        }
    }, [tabs, activeIndex, pushRoute])

    const safeIndex = activeIndex !== -1 ? activeIndex : 0
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <div className={classes.root}>
            <Tabs
                orientation={isMobile ? 'vertical' : 'horizontal'}
                value={safeIndex}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs"
            >
                {tabs.map((tab, index) => (
                    <Tab
                        key={tab.label}
                        label={tab.label}
                        {...a11yProps(index)}
                        classes={isMobile ? { wrapper: classes.wrapper } : {}}
                    />
                ))}
            </Tabs>
            <Box mt={3} p={2}>
                <Switch>
                    {tabs.map(({ key, path, component }, index) => {
                        return (
                            <Route
                                key={key}
                                exact={true}
                                path={`${baseRoute}${path}`}
                                component={component}
                            />
                        )
                    })}
                </Switch>
            </Box>
        </div>
    )
}
