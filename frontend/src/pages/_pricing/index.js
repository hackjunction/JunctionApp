import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Footer from 'components/layouts/Footer';
import PageWrapper from 'components/layouts/PageWrapper';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';

import CenteredContainer from 'components/generic/CenteredContainer';
import GlobalNavBar from 'components/navbars/GlobalNavBar';
import PricingCard from 'components/generic/PricingCard';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
    top: {
        borderBottom: 3,
    },
    wrapper: {
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        flex: 1,
        border: 3,
    },
    wrapper2: {
        background: '#D3D3D3',
        borderRadius: '12px',
        overflow: 'hidden',
        flex: 1,
        border: 3,
    },
    center: {
        textAlign: 'center',
    },
}));

export default () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation(); // eslint-disable-line
    const classes = useStyles();
    const body1 = ['Event registration and organization through platform'];
    const body2 = [
        'Event registration and organization through platform',
        'Tech Support during event',
        'Dedicated project lead from Junction Team',
        'Junction made website for event',
        'Event PR through Junction media channel',
    ];
    const body3 = [
        'Event registration and organization through platform',
        'Tech Support during event',
    ];

    function changeBackground(e) {
        e.target.style.background = 'white';
    }

    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <>
                    <Divider size={2} />
                    <CenteredContainer>
                        <Grid
                            container
                            direction='row'
                            justify='center'
                            spacing={3}
                        >
                            <PricingCard
                                topic='For non-profits and Junction partners'
                                body={body1}
                                price='Free'
                                wrapper={classes.wrapper2}
                            />
                            <PricingCard
                                topic='Platform only'
                                body={body3}
                                price='800 €'
                                wrapper={classes.wrapper2}
                                onMouseOver={changeBackground}
                            />
                            <PricingCard
                                topic='For companies'
                                body={body2}
                                price='4 100 €'
                                wrapper={classes.wrapper}
                            />

                            <Button
                                variant='outlined'
                                color='theme_lightgray'
                                strong
                                onClick={() => dispatch(push('/contact'))}
                            >
                                Contact us for more information
                            </Button>
                        </Grid>
                    </CenteredContainer>
                    <Divider size={4} />
                </>
            )}
        />
    );
};
