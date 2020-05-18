import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'

import RankingsService from 'services/rankings'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as AuthSelectors from 'redux/auth/selectors'

export default () => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const rankingsOverall = useSelector(OrganiserSelectors.rankingsOverall)

    const [ScoreGrid, setScoreGrid] = useState({})
    const [ProjectRank, setProjectRank] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const pGrid = {}
            const pRank = []
            RankingsService.getVotes(idToken, event.slug).then(votes => {
                projects.forEach(p0 => {
                    const i = rankingsOverall?.indexOf(p0._id)
                    pGrid[p0._id] = {}
                    pRank[i] = {}
                    pRank[i]['rank'] = i
                    pRank[i]['id'] = p0._id
                    pRank[i]['name'] = p0.name
                    projects.forEach(p1 => {
                        pGrid[p0._id][p1._id] = { win: 0, lose: 0, tally: 0 }
                        //p0._id !== p1._id ? { win: 0, lose: 0 } : null
                    })
                })
                console.log(votes)
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
                setScoreGrid(pGrid)
                setProjectRank(pRank)
            })
        }
        fetchData()
    }, [idToken, event.slug, projects, rankingsOverall])
    console.log('ScoreGrid', ScoreGrid)
    // console.log('ProjectRank', ProjectRank)

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Gavel_matchup_spread_</TableCell>
                        {ProjectRank.map(project => (
                            <TableCell key={project.id}>
                                {project.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ProjectRank.map(project => (
                        <TableRow key={project.id}>
                            <TableCell key={project.id}>
                                #{project.rank} {project.name}
                            </TableCell>
                            {ProjectRank.map(cell => (
                                <TableCell key={cell.id}>
                                    <Chip
                                        color={
                                            ScoreGrid[project.id][cell.id]
                                                .tally === 0
                                                ? 'default'
                                                : ScoreGrid[project.id][cell.id]
                                                      .tally > 0
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                        label={
                                            ScoreGrid[project.id][cell.id].win +
                                            '-' +
                                            ScoreGrid[project.id][cell.id].lose
                                        }
                                    ></Chip>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
