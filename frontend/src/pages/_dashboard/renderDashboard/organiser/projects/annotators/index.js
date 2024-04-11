import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import RankingsService from 'services/rankings'
import GavelService from 'services/reviewing/gavel'
import { debugGroup } from 'utils/debuggingTools'

export default () => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const [results, setResults] = useState({
        public: {},
        full: {},
    })

    const [gavelData, setGavelData] = useState({
        projects: {},
        annotators: {},
    })

    useEffect(() => {
        // if (!idToken || !event.slug) return
        Promise.all([
            RankingsService.getPublicResults(event.slug),
            RankingsService.getFullResults(idToken, event.slug),
        ]).then(res => {
            debugGroup('Ranking results', res)
            setResults({
                public: res[0],
                full: res[1],
            })
        })
    }, [idToken, event.slug])

    useEffect(() => {
        Promise.all([
            GavelService.getAllProjects(idToken, event.slug),
            GavelService.getAllAnnotators(idToken, event.slug),
        ]).then(res => {
            debugGroup('getting projects and annotators for gavel', res)
            setGavelData({
                projects: res[0],
                annotators: res[1],
            })
        })
    }, [idToken, event.slug])

    return (
        <div>
            <h1>Debug</h1>
            <h3>Public results from state</h3>
            <pre>{JSON.stringify(results.public, null, 2)}</pre>
            <h3>Full results from state</h3>
            <pre>{JSON.stringify(results.full, null, 2)}</pre>
            <h3>Gavel projects from state</h3>
            <pre>{JSON.stringify(gavelData.projects, null, 2)}</pre>
            <h3>Gavel annotators from state</h3>
            <pre>{JSON.stringify(gavelData.annotators, null, 2)}</pre>
            <button
                onClick={() =>
                    console.log({
                        results,
                        gavelData,
                    })
                }
            >
                Test
            </button>
        </div>
    )
}
