import React from 'react'

import NameField from 'components/projects/ProjectSubmissionFields/NameField'
import ImagesField from 'components/projects/ProjectSubmissionFields/ImagesField'
import PunchlineField from 'components/projects/ProjectSubmissionFields/DescriptionField'
import DescriptionField from 'components/projects/ProjectSubmissionFields/DescriptionField'
import TrackField from 'components/projects/ProjectSubmissionFields/TrackField'
import ChallengesField from 'components/projects/ProjectSubmissionFields/ChallengesField'
import TechnologiesField from 'components/projects/ProjectSubmissionFields/TechnologiesField'
import VideoField from 'components/projects/ProjectSubmissionFields/VideoField'
import DemoField from 'components/projects/ProjectSubmissionFields/DemoField'
import SourceField from 'components/projects/ProjectSubmissionFields/SourceField'
import SourcePublicField from 'components/projects/ProjectSubmissionFields/SourcePublicField'
import LocationField from 'components/projects/ProjectSubmissionFields/LocationField'
import PrivacyField from 'components/projects/ProjectSubmissionFields/PrivacyField'
import StatusField from 'components/projects/ProjectSubmissionFields/StatusField'

// TODO remove mandatory fields such as name,privacy, status, source and sourcePublic

const ProjectFieldsComponents = {
    name: props => <NameField props={props} />,
    images: props => <ImagesField props={props} />,
    punchline: props => <PunchlineField props={props} />,
    description: props => <DescriptionField props={props} />,
    track: (props, settings) => (
        <TrackField props={props} settings={settings} />
    ),
    challenges: (props, settings) => (
        <ChallengesField props={props} settings={settings} />
    ),
    technologies: props => <TechnologiesField props={props} />,
    video: props => <VideoField props={props} />,
    demo: (props, settings) => <DemoField props={props} settings={settings} />,
    source: props => <SourceField props={props} />,
    sourcePublic: () => <SourcePublicField />,
    location: (props, settings) => (
        <LocationField props={props} settings={settings} />
    ),
    privacy: props => <PrivacyField props={props} />,
    status: props => <StatusField props={props} />,
}

export default ProjectFieldsComponents
