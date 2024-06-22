import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'

import RankingsService from 'services/rankings'
import * as OrganiserSelectors from 'reducers/organiser/selectors'
import * as AuthSelectors from 'reducers/auth/selectors'

export default () => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const rankingsOverall = useSelector(OrganiserSelectors.rankingsOverall)
    const rankingsByTrack = useSelector(OrganiserSelectors.rankingsByTrack)

    const [ScoreGrid, setScoreGrid] = useState({})
    const [ProjectRank, setProjectRank] = useState([])
    const [ProjectRanks, setProjectRanks] = useState({})
    const fetchData = async () => {
        const pGrid = {}
        const pRank = []
        const pRanks = {}

        /*projects.forEach(p0 => {
            pGrid[p0._id] = {}
            projects.forEach(p1 => {
                pGrid[p0._id][p1._id] = {
                    win: 0,
                    lose: 0,
                    tally: 0,
                }
            })
        })*/

        if (rankingsByTrack) {
            Object.keys(rankingsByTrack).forEach(name => {
                pRanks[name] = []
                projects.forEach(p0 => {
                    const i = rankingsByTrack[name].indexOf(p0._id)
                    if (i !== -1) {
                        /*pRank[i] = {}
                        pRank[i]['rank'] = i
                        pRank[i]['id'] = p0._id
                        pRank[i]['name'] = p0.name*/

                        pRanks[name][i] = {}
                        pRanks[name][i]['rank'] = i
                        pRanks[name][i]['id'] = p0._id
                        pRanks[name][i]['name'] = p0.name
                    }
                })
            })
        } else {
            pRanks['overall'] = []
            projects.forEach(p0 => {
                const i = rankingsOverall?.indexOf(p0._id)
                /*pRank[i] = {}
                pRank[i]['rank'] = i
                pRank[i]['id'] = p0._id
                pRank[i]['name'] = p0.name*/

                pRanks['overall'][i] = {}
                pRanks['overall'][i]['rank'] = i
                pRanks['overall'][i]['id'] = p0._id
                pRanks['overall'][i]['name'] = p0.name
            })
        }
        /*RankingsService.getVotes(idToken, event.slug).then(votes => {

            votes.forEach(v => {
                pGrid[v.winner.project][v.loser.project].win += 1
                pGrid[v.loser.project][v.winner.project].lose += 1
                pGrid[v.winner.project][v.loser.project].tally =
                    pGrid[v.winner.project][v.loser.project].win -
                    pGrid[v.winner.project][v.loser.project].lose
                pGrid[v.loser.project][v.winner.project].tally =
                    pGrid[v.loser.project][v.winner.project].win -
                    pGrid[v.loser.project][v.winner.project].lose
            })
            //setScoreGrid(pGrid)
            //setProjectRank(pRank)
            
        })*/
        setProjectRanks(pRanks)
    }

    useEffect(() => {
        fetchData()
    }, [idToken, event.slug, projects, rankingsOverall, rankingsByTrack])
    console.log('ProjectRanks', ProjectRanks)

    return (
        <>
            {Object.keys(ProjectRanks).map(trackName => (
                <TableContainer component={Paper}>
                    <TableBody>
                        {ProjectRanks[trackName].map(project => (
                            <TableRow key={project.id}>
                                <TableCell key={project.id}>
                                    #{project.rank + 1} {project.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            ))}
        </>
    )
}
