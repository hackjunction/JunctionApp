import React from 'react'
import Rating from '@material-ui/lab/Rating'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Typography, Tooltip, Grid } from '@material-ui/core/'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import PropTypes from 'prop-types'
import { Skills } from '@hackjunction/shared'

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.2rem',
    },
    label: {
        lineHeight: 1.1,
    },
    rating: {
        color: theme.palette.primary.main,
    },
}))

const IconContainer = ({ value, ...other }) => {
    return (
        <div>
            <Tooltip title={Skills.getLabelForSkillLevel(value)}>
                <div {...other} />
            </Tooltip>
        </div>
    )
}
IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
}

const SkillRating = ({ data, small = false, showTooltip, size }) => {
    const classes = useStyles()

    const StyledRating = withStyles(theme => ({
        iconFilled: {
            color: theme.palette.secondary.main,
        },
        iconHover: {
            color: theme.palette.secondary.dark,
        },
    }))(Rating)

    return (
        <Grid direction="column" alignItems="stretch" container >
            <div className={classes.inline}>
                <Grid

                    key={data.skill}
                    item
                    xs={6}
                    wrap='nowrap'
                >
                    <Typography
                        variant={small ? 'caption' : 'inherit'}
                        className={classes.label}
                        align="left"
                    >
                        {data.skill}
                    </Typography>
                </Grid>
                <Grid

                    key={data.level}
                    item
                    xs={6}
                    wrap='nowrap'
                >
                    <StyledRating
                        name="hovertooltip"
                        value={data.level}
                        icon={<FiberManualRecordIcon fontSize="inherit" />}
                        precision={1}
                        IconContainerComponent={showTooltip ? IconContainer : undefined}
                        size={small ? "small" : ""}
                        readOnly={showTooltip ? false : true}
                    />
                </Grid>
            </div>

        </Grid >
    )
}

export default SkillRating
