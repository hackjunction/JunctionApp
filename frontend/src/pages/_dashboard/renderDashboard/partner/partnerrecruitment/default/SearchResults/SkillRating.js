import React from 'react'
import Rating from '@material-ui/lab/Rating'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Typography, Tooltip } from '@material-ui/core/'
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

const SkillRating = ({ data, small = false, showTooltip }) => {
    const classes = useStyles()

    const StyledRating = withStyles({
        iconFilled: {
            color: '#F38100',
        },
        iconHover: {
            color: '#F38100',
        },
    })(Rating)

    return (
        <div className={classes.inline}>
            <Typography
                variant={small ? 'caption' : 'inherit'}
                className={classes.label}
                align="left"
            >
                {data.skill}
            </Typography>
            <StyledRating
                name="hovertooltip"
                value={data.level}
                icon={<FiberManualRecordIcon fontSize="inherit" />}
                precision={1}
                IconContainerComponent={showTooltip ? IconContainer : undefined}
                size="small"
                readOnly={showTooltip ? false : true}
            />
        </div>
    )
}

export default SkillRating
