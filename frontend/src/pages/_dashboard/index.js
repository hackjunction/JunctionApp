import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import { push } from 'connected-react-router'
import SlugPage from './renderDashboard'
import DefaultPage from './renderDashboard/default'
import { useMyEvents, useActiveEvents } from 'graphql/queries/events'
import { useSelector, useDispatch } from 'react-redux'


import * as UserSelectors from 'redux/user/selectors'

export default () => {
    const match = useRouteMatch()
    const dispatch = useDispatch()

    // const recruiterEvents = useSelector(UserSelectors.userProfileRecruiterEvents)
    // const [organizerEvents, loading] = useMyEvents()//TODO: move to user state
    // const participantEvents = useSelector(UserSelectors.userProfileRegistrations)


    // const [activeEvents] = useActiveEvents({}) //active events, from these we select where to rediret, or default

    // console.log("activeEvents", activeEvents)
    // console.log("organizerEvents", organizerEvents)
    // console.log("recruiterEvents", recruiterEvents)
    // console.log("participantEvents", participantEvents)

    // // recruiterEvents.map(e => e.eventId)
    // // organizerEvents.map(e => e._id)
    // // participantEvents.map(e => e.event)

    // //find the first active recruiter event, organizer event or registration, otherwise undefined
    // var defaultPage = activeEvents?.find(active => recruiterEvents?.some(e => e.eventId === active._id))
    // console.log("defaultPage?", defaultPage)
    // //abstract equality
    // if (defaultPage == null) {
    //     defaultPage = activeEvents?.find(active => organizerEvents?.some(e => e._id === active._id))
    //     console.log("defaultPage organizerEvents", defaultPage)
    // }
    // if (defaultPage == null) {
    //     defaultPage = activeEvents?.find(active => participantEvents?.some(e => e.event === active._id))
    //     console.log("defaultPage participantEvents", defaultPage)
    // }
    // console.log("defaultPage", defaultPage != null ? "not null" : "null", match)

    // useEffect(() => {
    //     if (defaultPage != null) {
    //         console.log(`${match.path}/${defaultPage.slug}`)
    //         dispatch(push(`${match.path}/${defaultPage.slug}`))
    //     } else {
    //         console.log(`${match.path}`)
    //         dispatch(push(`${match.path}`))
    //     }
    // }, [defaultPage, dispatch])


    //redirect to right event page, default, or out
    return (
        <Switch>

            <Route
                exact={false}
                path={`${match.path}/event/:slug` /*TODO: pass correct event and role and create default case*/}
                component={SlugPage}
            />
            <Route
                exact={false}
                path={`${match.path}/default` /*TODO: pass correct event and role and create default case*/}
                component={DefaultPage}
            />

            {/* For all other routes, redirect outta here */}
            {/* <Redirect to="/" /> */}
        </Switch>
    )
}


// return (
//     <Switch>
//         {defaultPage != null ? (
//             <Route
//                 exact={false}
//                 path={`${match.path}/:${defaultPage.slug}` /*TODO: pass correct event and role and create default case*/}
//                 component={SlugPage}
//             />
//         ) : (
//             <Route
//                 exact={false}
//                 path={`${match.path}/default`}
//                 component={DefaultPage}
//             />
//         )}
//         {/* For all other routes, redirect outta here */}
//         <Redirect to="/" />
//     </Switch>
// )