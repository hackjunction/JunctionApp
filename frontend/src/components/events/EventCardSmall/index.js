import React, { useState, useEffect, useCallback } from "react";

import { connect } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import MiscUtils from "utils/misc";
import Image from "components/generic/Image";
import EventsService from "services/events";

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "2px 7px 30px rgba(0, 0, 0, 0.04)",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "2px 7px 30px rgba(0, 0, 0, 0.12)"
    }
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    minHeight: "130px"
  }
}));

const EventCardSmall = ({ eventId, event, push }) => {
  const classes = useStyles();
  const [remoteEvent, setRemoteEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const data = event || remoteEvent;

  useEffect(() => {
    if (!event && eventId) {
      setLoading(true);
      EventsService.getPublicEventById(eventId).then(res => {
        setRemoteEvent(res);
        setLoading(false);
      });
    }
  }, [event, eventId]);

  const handleClick = useCallback(() => {
    push(`/dashboard/${data.slug}`);
  }, [data.slug, push]);

  if (!event && !eventId) {
    return null;
  }

  const renderImage = () => {
    if (loading) {
      return (
        <Skeleton
          className={classes.image}
          variant="rect"
          height="100%"
          width="100%"
        />
      );
    } else {
      return (
        <Image
          className={classes.image}
          publicId={data.coverImage ? data.coverImage.publicId : null}
          transformation={{
            width: 400,
            height: 150
          }}
        />
      );
    }
  };

    const renderContent = () => {
        if (loading || !data) {
            return (
                <React.Fragment>
                    <Skeleton width="40%" />
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Typography variant="button">
                        {MiscUtils.formatDateInterval(data.startTime, data.endTime)}
                    </Typography>
                    <Typography variant="h6">{data.name}</Typography>
                    <Typography variant="subtitle1">
                        {data.eventType === 'physical'
                            ? `${data.eventLocation.city}, ${data.eventLocation.country}`
                            : 'Online'}
                    </Typography>
                </React.Fragment>
            );
        }
    };

  return (
    <Paper className={classes.paper} onClick={handleClick}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={3}>
          {renderImage()}
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            p={2}
          >
            {renderContent()}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapDispatchToProps = dispatch => ({
  push: route => dispatch(push(route))
});

export default connect(null, mapDispatchToProps)(EventCardSmall);
