import React from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Box, Typography, Button as MuiButton } from '@material-ui/core';
import ProjectsGrid from 'components/projects/ProjectsGrid';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const ProjectsPreview = ({ projects = [], count, event, label, subheading, onClickMore, onProjectSelected }) => {
    return (
        <Box mb={3} display="flex" flexDirection="column">
            <Box p={3} display="flex" flexDirection="column" alignItems="center">
                <Typography align="center" variant="h4">
                    {label}
                </Typography>
                {subheading && (
                    <Typography align="center" variant="button">
                        {subheading}
                    </Typography>
                )}
            </Box>
            <ProjectsGrid projects={projects} event={event} onSelect={onProjectSelected} />
            {onClickMore && (
                <Box mt={2} display="flex" flexDirection="row" justifyContent="flex-end">
                    <MuiButton onClick={onClickMore}>
                        See all {count} projects
                        <ArrowForwardIosIcon />
                    </MuiButton>
                </Box>
            )}
        </Box>
    );
};

const mapDispatch = (dispatch, ownProps) => ({
    onClickMore: ownProps.moreLink ? () => dispatch(push(ownProps.moreLink)) : null,
    onProjectSelected: project => dispatch(push(`/projects/${ownProps.event.slug}/view/${project._id}`))
});

export default connect(null, mapDispatch)(ProjectsPreview);
