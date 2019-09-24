import _axios from 'services/axios';

const TravelGrantsService = {};

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    };
}

TravelGrantsService.getTravelGrantsForEvent = (idToken, eventSlug) => {
    return _axios.get(`/travel-grants/${eventSlug}/all`, config(idToken));
};

TravelGrantsService.getTravelGrantForUser = (idToken, eventSlug) => {
    return _axios.get(`/travel-grants/${eventSlug}`, config(idToken));
};

export default TravelGrantsService;
