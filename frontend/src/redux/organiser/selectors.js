export const event = state => state.organiser.event.data;
export const eventLoading = state => state.organiser.event.loading;
export const eventError = state => state.organiser.event.error;
export const eventUpdated = state => state.organiser.event.updated;

export const stats = state => state.organiser.stats.data;
export const statsLoading = state => state.organiser.stats.loading;
export const statsError = state => state.organiser.stats.error;
export const statsUpdated = state => state.organiser.stats.updated;

export const organisers = state => state.organiser.organisers.data;
export const organisersMap = state => state.organiser.organisers.map;
export const organisersLoading = state => state.organiser.organisers.loading;
export const organisersError = state => state.organiser.organisers.error;
export const organisersUpdated = state => state.organiser.organisers.updated;

export const attendees = state => state.organiser.attendees.data;
export const attendeesLoading = state => state.organiser.attendees.loading;
export const attendeesError = state => state.organiser.attendees.error;
export const attendeesUpdated = state => state.organiser.attendees.updated;
