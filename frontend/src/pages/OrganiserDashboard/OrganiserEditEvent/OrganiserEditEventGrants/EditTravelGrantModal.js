import React, { useMemo, useState, useCallback } from 'react';
import styles from './OrganiserEditEventGrants.module.scss';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    TextField,
    Box,
    CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import Table from 'components/generic/Table';
import Modal from 'components/generic/Modal';
import * as OrganiserActions from 'redux/organiser/actions';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    }
}));

const EditTravelGrantModal = ({ slug, activeItem, onClose, createTravelGrant }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [sum, setSum] = useState(0);
    const [travelsFrom, setTravelsFrom] = useState('Finland');
    const modalOpen = Boolean(activeItem);
    const userName = activeItem ? `${activeItem.answers.firstName} ${activeItem.answers.lastName}` : '';

    const handleSave = useCallback(() => {
        if (!activeItem) return;
        setLoading(true);
        createTravelGrant(slug, sum, travelsFrom, activeItem.user).finally(() => {
            setLoading(false);
        });
    }, [createTravelGrant, slug, sum, travelsFrom, activeItem]);

    const renderContent = () => {
        if (!activeItem) return null;
        return (
            <React.Fragment>
                <List>
                    <ListItem>
                        <ListItemText primary="Country of travel" secondary={`${activeItem.answers.countryOfTravel}`} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText primary="Travel grant status" secondary="Pending" />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <TextField
                            type="number"
                            label="Enter amount (EUR)"
                            margin="normal"
                            fullWidth
                            value={sum}
                            onChange={e => setSum(e.target.value)}
                        />
                    </ListItem>
                    <Box mt={2} display="flex" flexDirection="row" justifyContent="flex-end" alignItems="center">
                        <Button className={classes.button} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        {loading && <CircularProgress size={24} />}
                    </Box>
                </List>
            </React.Fragment>
        );
    };

    return (
        <Modal title={userName} isOpen={modalOpen} handleClose={onClose}>
            {renderContent()}
        </Modal>
    );
};

const mapState = state => ({});

const mapDispatch = dispatch => ({
    createTravelGrant: (slug, sum, travelsFrom, userId) =>
        dispatch(OrganiserActions.createTravelGrant(slug, sum, travelsFrom, userId))
});

export default connect(
    mapState,
    mapDispatch
)(EditTravelGrantModal);
