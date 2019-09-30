import React, { useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { Typography, Box, Grid } from '@material-ui/core';
import { sumBy, filter, sortBy } from 'lodash-es';
import Stepper from 'components/generic/Stepper';
import Empty from 'components/generic/Empty';
import List from 'components/generic/List';
import Statistic from 'components/generic/Statistic';
import Table from 'components/generic/Table';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import AddGroupModal from './AddGroupModal';
import TravelGrantStepperPreview from './TravelGrantStepperPreview';

const TravelGrantStepper = ({ registrations }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [groups, setGroups] = useState([]);

    const handleAddGroup = useCallback(
        (group, amount) => {
            const value = sortBy(groups.concat({ group, amount }), amount);
            setGroups(value);
        },
        [groups]
    );

    const handleRemoveGroup = useCallback(
        (item, index) => {
            setGroups(groups.filter((group, idx) => idx !== index));
        },
        [groups]
    );

    const toggleModal = useCallback(() => {
        setModalOpen(!modalOpen);
    }, [modalOpen]);

    return (
        <Box>
            <Box mt={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Statistic label="Confirmed participants" value={registrations.length} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Statistic
                            label="Travel grants admitted"
                            value={filter(registrations, r => !!r.travelGrant).length}
                            suffix={`/${registrations.length}`}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Statistic
                            label="Current spend"
                            value={sumBy(registrations, 'travelGrant') || 0}
                            suffix="EUR"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={2}>
                <Typography>
                    This is a tool for automatically assigning travel grants to participants. Choose which participants
                    should be eligible for how much, and the tool will automatically assign travel grants to
                    participants in the order they registered.
                </Typography>
            </Box>
            <Stepper
                activeStep={activeStep}
                onStepChange={setActiveStep}
                onDone={() => window.alert('HELLO')}
                steps={[
                    {
                        key: 'set-groups',
                        label: 'Configure travel grant groups and amounts',
                        render: () => (
                            <React.Fragment>
                                <AddGroupModal isOpen={modalOpen} onClose={toggleModal} onDone={handleAddGroup} />
                                <List
                                    data={groups}
                                    rowKey="group.label"
                                    renderPrimary={({ group, amount }) => group.label}
                                    renderSecondary={({ group, amount }) => amount}
                                    onDelete={handleRemoveGroup}
                                />
                                <Empty
                                    isEmpty={groups.length === 0}
                                    emptyText="Start by adding your first group"
                                    button={{ text: 'Add group', onClick: toggleModal }}
                                />
                            </React.Fragment>
                        )
                    },
                    {
                        key: 'preview-spend',
                        label: 'Preview spend',
                        render: () => <TravelGrantStepperPreview registrations={registrations} groupConfig={groups} />
                    },
                    {
                        key: 'assign-grants',
                        label: 'Assign grants',
                        render: () => <Typography>Submit changes</Typography>
                    }
                ]}
            />
        </Box>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrationsConfirmed(state)
});

export default connect(mapState)(TravelGrantStepper);
