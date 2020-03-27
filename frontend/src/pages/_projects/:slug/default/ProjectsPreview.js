import React, { useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { Box, Typography, Button as MuiButton } from '@material-ui/core'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useTranslation } from 'react-i18next';

export default ({
    projects = [],
    count,
    event,
    label,
    subheading,
    moreLink,
}) => {
    const dispatch = useDispatch()
    const handleClickMore = useCallback(() => {
        dispatch(push(moreLink))
    }, [dispatch, moreLink])

    const { t, i18n } = useTranslation();
    const handleSelected = useCallback(
        project => {
            dispatch(push(`/projects/${event.slug}/view/${project._id}`))
        },
        [event.slug, dispatch]
    )
    return (
      <Box mb={3} display='flex' flexDirection='column'>
        <Box p={3} display='flex' flexDirection='column' alignItems='center'>
          <Typography align='center' variant='h4'>
            {label}
          </Typography>
          {subheading && (
            <Typography align='center' variant='button'>
              {subheading}
            </Typography>
          )}
        </Box>
        <ProjectsGrid
          projects={projects}
          event={event}
          onSelect={handleSelected}
        />
        {moreLink && (
          <Box
            mt={2}
            display='flex'
            flexDirection='row'
            justifyContent='flex-end'
          >
            <MuiButton onClick={handleClickMore}>
              {t('See_all_projects_', {
                count: count,
              })}
              <ArrowForwardIosIcon />
            </MuiButton>
          </Box>
        )}
      </Box>
    );
}
