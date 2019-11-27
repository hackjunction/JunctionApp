import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import moment from 'moment-timezone';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core';

import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';

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

const ApplicationDetail = ({ data }) => {
    const classes = useStyles();
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(0);

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
                <Typography variant="h6">Travel grant amount (EUR)</Typography>
                <Typography variant="body1" paragraph>
                    {data.travelGrant}
                </Typography>
                <Typography variant="h6">Sum of receipts (EUR)</Typography>
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
            <Box height="200px" />
        </CenteredContainer>
    );
};

export default ApplicationDetail;
