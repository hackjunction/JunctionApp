import React, { useCallback, useMemo, useEffect } from "react";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as AuthSelectors from "redux/auth/selectors";
import * as RecruitmentSelectors from "redux/recruitment/selectors";
import * as RecruitmentActions from "redux/recruitment/actions";

import { useArray } from "hooks/customHooks";
import Select from "components/inputs/Select";

import FilterItem from "./FilterItem";
import EventsFilterItem from "./EventsFilterItem";

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: "400px",
    minHeight: "400px"
  },
  items: {
    backgroundColor: "#fafafa",
    borderRadius: "7px",
    padding: theme.spacing(1)
  },
  itemsEmpty: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

const EventsFilter = ({
  idTokenData,
  allEvents,
  eventsMap,
  filters,
  setFilters
}) => {
  const classes = useStyles();
  const [events, addEvent, removeEvent, editEvent, setEvents] = useArray(
    filters
  );

  const handleSubmit = useCallback(() => {
    setFilters(events);
  }, [events, setFilters]);

  const handleReset = useCallback(() => {
    setEvents(filters);
  }, [filters, setEvents]);

  const handleAdd = useCallback(
    event => {
      addEvent({
        event,
        statuses: []
      });
    },
    [addEvent]
  );

  const eventOptions = useMemo(() => {
    return allEvents
      .filter(event => {
        return (
          idTokenData.recruiter_events &&
          idTokenData.recruiter_events.indexOf(event._id) !== -1
        );
      })
      .map(event => ({
        label: event.name,
        value: event._id
      }));
  }, [idTokenData, allEvents]);

  const renderEvents = () => {
    if (!events.length) {
      return (
        <Typography variant="subtitle1" className={classes.itemsEmpty}>
          No events selected
        </Typography>
      );
    }

    return events.map((item, index) => (
      <EventsFilterItem
        {...item}
        eventName={eventsMap[item.event].name}
        key={item.event}
        onEdit={item => editEvent(index, item)}
        onRemove={() => removeEvent(index)}
      />
    ));
  };

  return (
    <FilterItem
      active={filters.length > 0}
      label="Events"
      onSubmit={handleSubmit}
      onClose={handleReset}
    >
      <Box className={classes.wrapper}>
        <Select
          autoFocus
          label="Choose events (must have all)"
          options={eventOptions}
          onChange={handleAdd}
        />
        <Box className={classes.items}>{renderEvents()}</Box>
      </Box>
    </FilterItem>
  );
};

const mapState = state => ({
  idTokenData: AuthSelectors.idTokenData(state),
  allEvents: RecruitmentSelectors.events(state),
  eventsMap: RecruitmentSelectors.eventsMap(state),
  filters: RecruitmentSelectors.filters(state).events || []
});

const mapDispatch = dispatch => ({
  setFilters: value =>
    dispatch(RecruitmentActions.setFiltersField("events", value))
});

export default connect(mapState, mapDispatch)(EventsFilter);
