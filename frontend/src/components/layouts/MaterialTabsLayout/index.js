import React, { useMemo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { findIndex } from 'lodash-es'
import { Tabs, Tab, Typography, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

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

const TabNavigation = ({ tabs, location, baseRoute, transparent = false }) => {
    const navigate = useNavigate()

    const pushRoute = useCallback(
        path => {
            navigate(`${baseRoute}${path}`)
        },
        [baseRoute, navigate],
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
        <div
            className={`w-full ${transparent ? 'bg-transparent' : 'bg-white'}`}
        >
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
                        classes={isMobile ? 'align-start' : ''}
                    />
                ))}
            </Tabs>
            <Box mt={3} p={2}>
                <Routes>
                    {tabs.map(({ key, path, component }) => (
                        <Route
                            key={key}
                            exact={true}
                            path={`${baseRoute}${path}`}
                            element={component}
                        />
                    ))}
                </Routes>
            </Box>
        </div>
    )
}

export default TabNavigation
