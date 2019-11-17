import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import PageWrapper from 'components/layouts/PageWrapper';

import Instructions from './Instructions';
import FirstProject from './FirstProject';
import CompareProjects from './CompareProjects';
import Complete from './Complete';

import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const EventDashboardReviewing = ({ event, annotator, updateAnnotator, annotatorLoading, annotatorError }) => {
    useEffect(() => {
        updateAnnotator(event.slug);
    }, [event.slug, updateAnnotator]);

    const renderContent = () => {
        if (!annotator) {
            return <Instructions />;
        }

        if (!annotator.prev) {
            return <FirstProject projectId={annotator.next} />;
        }

        if (annotator.prev && annotator.next) {
            return (
                <CompareProjects
                    annotator={annotator}
                    prevId={annotator.prev}
                    nextId={annotator.next}
                    isFirstChoice={annotator.ignore.length === 1}
                />
            );
        }

        return <Complete />;
    };

    return (
        <PageWrapper loading={annotatorLoading} error={annotatorError}>
            {renderContent()}
        </PageWrapper>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    annotator: DashboardSelectors.annotator(state),
    annotatorError: DashboardSelectors.annotatorError(state),
    annotatorLoading: DashboardSelectors.annotatorLoading(state)
});

const mapDispatch = dispatch => ({
    updateAnnotator: slug => dispatch(DashboardActions.updateAnnotator(slug))
});

export default connect(mapState, mapDispatch)(EventDashboardReviewing);
