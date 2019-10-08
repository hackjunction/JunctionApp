import ReactGA from 'react-ga';
import config from 'constants/config';

const AnalyticsService = {};

AnalyticsService.init = () => {
    console.log('Analytics -> initialize');
    if (config.GOOGLE_ANALYTICS_ID) {
        ReactGA.initialize(config.GOOGLE_ANALYTICS_ID);
    }
};

AnalyticsService.pageView = location => {
    console.log('Analytics -> pageView');
    if (config.GOOGLE_ANALYTICS_ID) {
        ReactGA.pageview(location.pathname);
    }
};

export default AnalyticsService;
