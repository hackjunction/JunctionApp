import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    Box,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ListItemText,
} from '@material-ui/core'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'

import ProjectsTable from 'components/tables/ProjectsTable'

import RankingsService from 'services/rankings'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as AuthSelectors from 'redux/auth/selectors'

export default () => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const rankingsOverall = useSelector(OrganiserSelectors.rankingsOverall)
    console.log('rank', rankingsOverall)
    console.log('projects', projects)

    const [ScoreGrid, setScoreGrid] = useState({})
    const [ProjectRank, setProjectRank] = useState({})
    // build grid
    useEffect(() => {
        const fetchData = async () => {
            const pGrid = {}
            const pRank = {}
            RankingsService.getVotes(idToken, event.slug).then(votes => {
                projects.forEach(p0 => {
                    pGrid[p0._id] = {}
                    pRank[p0._id] = {}
                    pRank[p0._id].rank = rankingsOverall?.indexOf(p0._id)
                    pRank[p0._id].name = p0.name
                    projects.forEach(p1 => {
                        pGrid[p0._id][p1._id] = { win: 0, lose: 0 }
                        //p0._id !== p1._id ? { win: 0, lose: 0 } : null
                    })
                })
                votes.forEach(v => {
                    pGrid[v.winner.project][v.loser.project].win += 1
                    pGrid[v.loser.project][v.winner.project].lose += 1
                })
                console.log('set', String(pGrid))
                console.log('serere', String(pRank))
                setScoreGrid(pGrid)
                setProjectRank(pRank)
            })
        }
        fetchData()
    }, [idToken, event.slug, projects, rankingsOverall])
    console.log('ScoreGrid', ScoreGrid)
    console.log('ProjectRank', ProjectRank)

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Spred</TableCell>
                            {Object.keys(ScoreGrid).map(row => (
                                <TableCell key={row}>
                                    {ProjectRank[row]?.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(ScoreGrid).map(row => (
                            <TableRow key={row}>
                                <TableCell key={row}>
                                    #{ProjectRank[row]?.rank}{' '}
                                    {ProjectRank[row]?.name}
                                </TableCell>
                                {Object.keys(ScoreGrid[row]).map(cell => (
                                    <TableCell key={cell}>
                                        <Chip
                                            color={
                                                ScoreGrid[row][cell].win -
                                                    ScoreGrid[row][cell].lose >
                                                0
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            label={
                                                ScoreGrid[row][cell].win +
                                                '-' +
                                                ScoreGrid[row][cell].lose
                                            }
                                        ></Chip>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
/*


            {Object.keys(projectsByRank).map(rank => (
                <li key={rank}>
                    {rank} : {projectsByRank[rank].name}
                </li>
            ))}



        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Spred</TableCell>
                            {Object.keys(ScoreGrid).map(row => (
                                <TableCell key={row}>
                                    {ProjectRank[row].name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(ScoreGrid).map(row => (
                            <TableRow key={row}>
                                <TableCell key={row}>
                                    #{ProjectRank[row].rank}{' '}
                                    {ProjectRank[row].name}
                                </TableCell>
                                {Object.keys(ScoreGrid[row]).map(cell => (
                                    <TableCell key={cell}>
                                        <Chip
                                            label={
                                                ScoreGrid[row][cell].win +
                                                '-' +
                                                ScoreGrid[row][cell].lose
                                            }
                                        ></Chip>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
 
*/
