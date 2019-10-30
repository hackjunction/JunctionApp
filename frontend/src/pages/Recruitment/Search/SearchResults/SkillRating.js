import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core/';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';



const useStyles = makeStyles(theme => ({
    inline: {
        display: 'flex'
    }

}));


const SkillRating = ({ data }) => {

    const classes = useStyles();

    const StyledRating = withStyles({
        iconFilled: {
            color: '#F38100',
        },
        iconHover: {
            color: '#F38100',
        },
    })(Rating);


    return (
        <div>

            <Box component="fieldset" borderColor="transparent">
                <div className={classes.inline}>
                    <Typography component="legend">{data.skill}</Typography>
                    <StyledRating
                        value={data.level}
                        icon={<FiberManualRecordIcon fontSize="inherit" />}
                        readOnly
                        size="small"
                    />
                </div>
            </Box>

        </div>
    );
}

export default SkillRating;