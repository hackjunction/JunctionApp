import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { RegistrationTravelGrantStatuses as Statuses } from '@hackjunction/shared';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button, Grid } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';
import TextInput from 'components/inputs/TextInput';
import PageWrapper from 'components/layouts/PageWrapper';
import Select from 'components/inputs/Select';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import { updateRegistrationTravelGrant } from 'redux/organiser/actions';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
    pdfWrapper: {
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        background: theme.palette.theme_lightgray.main,
        padding: theme.spacing(2),
        paddingTop: theme.spacing(5),
        position: 'relative'
    },
    pageText: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    pdfActions: {
        padding: theme.spacing(1),
        background: theme.palette.theme_lightgray.main,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

const ApplicationDetail = ({ data, event, updateRegistrationTravelGrant, enqueueSnackbar }) => {
    const classes = useStyles();
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(data ? data.travelGrantAmount : undefined);
    const [status, setStatus] = useState(data ? data.travelGrantStatus : undefined);
    const [comment, setComment] = useState(data ? data.travelGrantComment : undefined);

    const setNextPage = useCallback(() => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    }, [pageNumber, numPages]);

    const setPrevPage = useCallback(() => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }, [pageNumber]);

    const onLoaded = useCallback(({ numPages }) => {
        setNumPages(numPages);
    }, []);

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        try {
            await updateRegistrationTravelGrant(
                data._id,
                {
                    amount,
                    status,
                    comment
                },
                event.slug
            );
            enqueueSnackbar('Changes saved!', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Something went wrong...', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [data, event, amount, status, comment, updateRegistrationTravelGrant, enqueueSnackbar]);

    if (!data) return null;

    if (!data.travelGrantDetails) {
        return (
            <CenteredContainer>
                <PageHeader
                    heading={`${data.answers.firstName} ${data.answers.lastName}`}
                    subheading={data.answers.countryOfTravel}
                />
                <Typography variant="body1">This user has not submitted their travel grant details</Typography>
            </CenteredContainer>
        );
    }

    return (
        <PageWrapper loading={loading}>
            <CenteredContainer>
                <PageHeader heading={`${data.answers.firstName} ${data.answers.lastName}`} />
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6">Full legal name</Typography>
                    <Typography variant="body1">
                        {data.travelGrantDetails.legalName.firstName} {data.travelGrantDetails.legalName.middleName}{' '}
                        {data.travelGrantDetails.legalName.lastName}{' '}
                    </Typography>
                    <Typography variant="h6">Date of Birth</Typography>
                    <Typography variant="body1">
                        {moment(data.travelGrantDetails.dateOfBirth).format('DD.MM.YYYY')}
                    </Typography>
                    <Typography variant="h6">Email</Typography>
                    <Typography variant="body1" paragraph>
                        {data.travelGrantDetails.email}
                    </Typography>
                    <Typography variant="h6">Gender</Typography>
                    <Typography variant="body1" paragraph>
                        {data.travelGrantDetails.gender}
                    </Typography>
                    <Typography variant="h6">Country of travel</Typography>
                    <Typography variant="body1" paragraph>
                        {data.answers.countryOfTravel}
                    </Typography>
                    <Typography variant="h6">Address</Typography>
                    <Typography variant="body1" paragraph>
                        {data.travelGrantDetails.address.addressLine}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {data.travelGrantDetails.address.addressLine2}
                    </Typography>
                    <Typography variant="body1" paragraphy>
                        {data.travelGrantDetails.address.postalCode} {data.travelGrantDetails.address.city},{' '}
                        {data.travelGrantDetails.address.country}
                    </Typography>
                    <Typography variant="h6">Social Security Number</Typography>
                    {data.travelGrantDetails.hasSSN ? (
                        <Typography variant="body1" paragraph>
                            {data.travelGrantDetails.SSN}
                        </Typography>
                    ) : (
                        <Typography variant="body1" paragraph>
                            No Finnish SSN
                        </Typography>
                    )}
                    <Typography variant="h6">IBAN account details</Typography>
                    {data.travelGrantDetails.hasIBAN ? (
                        <>
                            <Typography variant="body1">{data.travelGrantDetails.IBAN.accountNumber}</Typography>
                            <Typography variant="body1">{data.travelGrantDetails.IBAN.swift}</Typography>
                            <Typography variant="body1" gutterBottom>
                                {data.travelGrantDetails.IBAN.bankName}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body1" paragraph>
                            No IBAN account
                        </Typography>
                    )}
                    <Typography variant="h6">Travel grant amount</Typography>
                    <Typography variant="body1" paragraph>
                        {data.travelGrant} EUR
                    </Typography>
                    <Typography variant="h6">Sum of receipts</Typography>
                    <Typography variant="body1" paragraph>
                        {data.travelGrantDetails.receiptsSum} EUR
                    </Typography>
                </Box>
                <Typography variant="h6">Receipts PDF</Typography>
                <Box className={classes.pdfActions}>
                    <Button onClick={setPrevPage} disabled={pageNumber <= 1}>
                        Prev page
                    </Button>
                    <Button onClick={() => window.open(data.travelGrantDetails.receiptsPdf.url, '_blank')}>
                        Show original
                    </Button>
                    <Button onClick={setNextPage} disabled={pageNumber >= numPages}>
                        Next page
                    </Button>
                </Box>
                <Box className={classes.pdfWrapper}>
                    <Typography variant="body1" className={classes.pageText}>
                        Page {pageNumber} of {numPages}
                    </Typography>
                    <Document
                        style={{ background: 'black' }}
                        file={data.travelGrantDetails.receiptsPdf.url}
                        onLoadSuccess={onLoaded}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                </Box>
                <Typography variant="h6" gutterBottom>
                    Edit
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Select
                            label="Status"
                            value={status}
                            onChange={setStatus}
                            options={[
                                {
                                    label: Statuses.asObject.pending.label,
                                    value: Statuses.asObject.pending.id
                                },
                                {
                                    label: Statuses.asObject.accepted.label,
                                    value: Statuses.asObject.accepted.id
                                },
                                {
                                    label: Statuses.asObject.rejected.label,
                                    value: Statuses.asObject.rejected.id
                                }
                            ]}
                        />
                    </Grid>
                    {status === Statuses.asObject.accepted.id && (
                        <Grid item xs={12}>
                            <TextInput label="Confirmed amount" type="number" value={amount} onChange={setAmount} />
                        </Grid>
                    )}
                    {status === Statuses.asObject.rejected.id && (
                        <Grid item xs={12}>
                            <TextInput label="Reason for rejection" value={comment} onChange={setComment} />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button onClick={handleSubmit} color="primary" variant="contained">
                            Save changes
                        </Button>
                    </Grid>
                </Grid>
                <Box height="200px" />
            </CenteredContainer>
        </PageWrapper>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state)
});

export default withSnackbar(connect(mapState, { updateRegistrationTravelGrant })(ApplicationDetail));
