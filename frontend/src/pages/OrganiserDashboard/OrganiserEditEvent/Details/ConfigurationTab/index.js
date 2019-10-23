import React from 'react';

const ConfigurationTab = () => {
    return (
        <div>
            <ul>
                <li>Quick links on dashboard</li>
                <li>Event announcements</li>
                <li>Discord configuration for event - what</li>
                <li>Is it a physical event or online?</li>
                <li>If physical: Travel grants available? If yes, in what currency>?</li>
                <li>If physical: Where is the event?</li>
                <li>Participant vetting or no? If no, is there a maximum amount of participants?</li>
                <li>Does the event have multiple tracks?</li>
                <li>Does the event have multiple challenges?</li>
                <li>Which judging method to use?</li>
            </ul>
            <p>
                Once the event configuration is done, probably best to not send all of this config to the client every
                time
            </p>
        </div>
    );
};

export default ConfigurationTab;
