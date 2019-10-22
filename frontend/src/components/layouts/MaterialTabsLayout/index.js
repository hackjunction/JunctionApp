import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, useMediaQuery } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

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
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: ({ transparent }) => ({
        flexGrow: 1,
        width: '100%',
        backgroundColor: transparent ? 'transparent' : theme.palette.background.paper
    }),
    wrapper: {
        textAlign: 'left',
        alignItems: 'flex-start'
    }
}));

const propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            content: PropTypes.node
        })
    )
};

const MaterialTabsLayout = ({ tabs, transparent = false }) => {
    const classes = useStyles({ transparent });
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className={classes.root}>
            <Tabs
                orientation={isMobile ? 'vertical' : 'horizontal'}
                value={value}
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
                {tabs.map((tab, index) => (
                    <TabPanel key={tab.label} value={value} index={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </Box>
        </div>
    );
};

MaterialTabsLayout.propTypes = propTypes;

export default MaterialTabsLayout;
