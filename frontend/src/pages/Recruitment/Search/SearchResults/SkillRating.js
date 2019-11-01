import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.2rem'
    },
    label: {
        lineHeight: 1.1
    }
}));

const SkillRating = ({ data }) => {
    const classes = useStyles();

    const StyledRating = withStyles({
        iconFilled: {
            color: '#F38100'
        },
        iconHover: {
            color: '#F38100'
        }
    })(Rating);

    return (
        <div className={classes.inline}>
            <Typography variant="caption" className={classes.label}>
                {data.skill}
            </Typography>
            <StyledRating
                value={data.level}
                icon={<FiberManualRecordIcon fontSize="inherit" />}
                readOnly
                size="small"
            />
        </div>
    );
};

export default SkillRating;
