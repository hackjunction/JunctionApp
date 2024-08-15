import React, { useCallback, useEffect, useState } from 'react'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography, IconButton } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
// TODO Remove responsive masonry
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Button from 'components/generic/Button'
import TeamCard from 'components/cards/TeamCard'
import TeamProfile from 'components/Team/TeamProfile'
import Apply from 'components/Team/Apply'
import Filter from 'components/Team/Filter'
import JoinTeamByCode from 'components/Team/JoinTeamByCode'
import { useTranslation } from 'react-i18next'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const { t } = useTranslation()
    const { slug } = event
    //TODO create pagination component
    const teams = useSelector(DashboardSelectors.teams)
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const [selected, setSelected] = useState(false)
    const [applying, setApplying] = useState(false)
    const [joinByCode, setJoinByCode] = useState(false)
    const [challengeFilter, setChallengeFilter] = useState('All challenges')

    const [selectedTeam, setSelectedTeam] = useState(null)
    const [loading, setLoading] = useState(false)

    const [currentPage, SetCurrentPage] = useState(0)
    const totalResults = useSelector(DashboardSelectors.teamsCount)
    const totalPages = Math.ceil(totalResults / 25)

    const hadleTeamCardClick = useCallback(
        async teamId => {
            if (teamId) {
                setLoading(true)
                dispatch(DashboardActions.updateSelectedTeam(slug, teamId))
                    .then(team => {
                        setSelectedTeam(team)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        },
        [selectedTeam],
    )

    useEffect(() => {
        dispatch(
            DashboardActions.updateTeams(
                slug,
                currentPage,
                25,
                challengeFilter,
            ),
        )
    }, [
        currentPage,
        applying,
        selected,
        selectedTeam,
        joinByCode,
        challengeFilter,
    ])

    let teamCards = []
    if (challengeFilter !== 'All challenges') {
        teamCards = teams?.filter(team => team.challenge === challengeFilter)
    } else {
        teamCards = teams ? teams : []
    }

    const handlePrevPage = useCallback(() => {
        SetCurrentPage(currentPage - 1)
    }, [currentPage])

    const handleNextPage = useCallback(() => {
        SetCurrentPage(currentPage + 1)
    }, [currentPage])

    const renderPagination = () => {
        return (
            <Box display="flex" flexDirection="row" alignItems="center">
                <IconButton
                    disabled={currentPage === 0}
                    onClick={handlePrevPage}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <Box padding={1}>
                    {totalResults === 0 ? (
                        <Typography variant="overline">
                            {t('Page_')} 1
                        </Typography>
                    ) : (
                        <Typography variant="overline">
                            {t('Page_')} {currentPage + 1} of {totalPages}
                        </Typography>
                    )}
                </Box>
                <IconButton
                    disabled={currentPage + 1 === totalPages}
                    onClick={handleNextPage}
                >
                    <ChevronRightIcon />
                </IconButton>
            </Box>
        )
    }

    //TODO add a method to edit or withdraw an application
    return (
        <>
            {applying &&
                selectedTeam &&
                Object.keys(selectedTeam).length > 0 && (
                    <div>
                        <div className="tw-mb-4">
                            <Button
                                color="outlined_button"
                                variant="jOutlined"
                                onClick={() => {
                                    setApplying(false)
                                    setSelectedTeam(null)
                                }}
                            >
                                {t('Back_')}
                            </Button>
                        </div>
                        <Apply
                            teamRolesData={selectedTeam.teamRoles}
                            afterSubmitAction={() => {
                                setApplying(false)
                                setSelectedTeam(null)
                            }}
                            loading={loading}
                        />
                    </div>
                )}
            {selected &&
                selectedTeam &&
                Object.keys(selectedTeam).length > 0 && (
                    <div>
                        <div className="tw-mb-4">
                            <Button
                                color="outlined_button"
                                variant="jOutlined"
                                onClick={() => {
                                    setSelected(false)
                                    setSelectedTeam(null)
                                }}
                            >
                                {t('Back_')}
                            </Button>
                        </div>
                        <TeamProfile
                            teamData={selectedTeam}
                            loading={loading}
                            enableActions={false}
                            onRoleClick={() => {
                                if (!hasTeam) {
                                    setApplying(true)
                                    setSelected(false)
                                }
                            }}
                        />
                    </div>
                )}
            {!selected && !applying && (
                <>
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                        {!hasTeam ? (
                            <Button
                                color="outlined_button"
                                variant="jOutlined"
                                onClick={() => setJoinByCode(!joinByCode)}
                            >
                                {t('Join_team_using_code_')}
                                {/* Join team using a code */}
                            </Button>
                        ) : (
                            <span></span>
                        )}
                        <Filter
                            noFilterOption={t('All_challenges_')}
                            filterArray={event.challenges.map(challenge => ({
                                label: challenge.name,
                                value: challenge._id,
                            }))}
                            onChange={setChallengeFilter}
                        />
                    </div>
                    {joinByCode && (
                        <div className="tw-bg-white tw-p-4 tw-text-left tw-rounded-lg tw-shadow-md tw-flex tw-justify-center tw-items-center tw-gap-4">
                            <JoinTeamByCode
                                onAction={() => setJoinByCode(false)}
                            />
                            <div>
                                <Button
                                    color="outlined_button"
                                    variant="jOutlined"
                                    onClick={() => setJoinByCode(false)}
                                >
                                    {t('Close_')}
                                </Button>
                            </div>
                        </div>
                    )}
                    {teamCards.length > 0 ? (
                        <>
                            <Box
                                p={2}
                                display="flex"
                                flexDirection="row"
                                justifyContent="flex-end"
                            >
                                {renderPagination()}
                            </Box>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{
                                    600: 1,
                                    800: 2,
                                    1440: 3,
                                }}
                            >
                                <Masonry>
                                    {teamCards?.map(team => (
                                        <TeamCard
                                            key={team._id}
                                            teamData={team}
                                            disableActions={hasTeam}
                                            onClickApply={() => {
                                                hadleTeamCardClick(team._id)
                                                if (!hasTeam) {
                                                    setApplying(true)
                                                }
                                            }}
                                            onClick={() => {
                                                hadleTeamCardClick(team._id)
                                                setSelected(true)
                                            }}
                                        />
                                    ))}
                                </Masonry>
                            </ResponsiveMasonry>
                            <Box
                                p={2}
                                display="flex"
                                flexDirection="row"
                                justifyContent="flex-end"
                            >
                                {renderPagination()}
                            </Box>
                        </>
                    ) : (
                        <div>{t('No_teams_found_')}</div>
                    )}
                </>
            )}
        </>
    )
}
