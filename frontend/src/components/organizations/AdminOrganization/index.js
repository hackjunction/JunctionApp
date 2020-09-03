import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import Button from 'components/generic/Button'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { OutboundLink } from 'react-ga'

import GradientBox from 'components/generic/GradientBox'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles(theme => ({
    outboundLink: {
        '& a': {
            textDecoration: 'none !important',
        },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
    },
}))

const OrganizationDetail = ({ organization, handleRemove }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    return (
        <Grid item xs={12} md={12}>
            <GradientBox color="theme_white" p={3}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography>{organization.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{organization.description}</Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.outboundLink}>
                        <OutboundLink
                            eventLabel="myLabel"
                            to={organization.link}
                            target="_blank"
                        >
                            <Button color="theme_turquoise" variant="contained">
                                Link
                            </Button>
                        </OutboundLink>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={handleRemove}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() =>
                                dispatch(
                                    push(
                                        `admin/organization/${organization.slug}`
                                    )
                                )
                            }
                        >
                            <EditIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </GradientBox>
        </Grid>
    )
}
export default OrganizationDetail
