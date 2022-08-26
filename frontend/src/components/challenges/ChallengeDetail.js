import React from 'react'
import { Box, Divider } from '@material-ui/core'

import GradientBox from 'components/generic/GradientBox'
import ChallengeSection from './ChallengeSection'

const makeBoxStyles = focus => ({
    boxShadow: `2px 7px 30px rgb(0 0 0 / ${focus ? '12' : '4'}%)`,
    cursor: 'pointer',
})

const ChallengeDetail = ({
    partner,
    title,
    subtitle,
    logo,
    link,
    isFocused,
}) => {
    return (
        <>
            <Box p={2}>
                <GradientBox
                    style={makeBoxStyles(isFocused)}
                    color={'theme_white'}
                    p={3}
                >
                    <ChallengeSection
                        partner={partner}
                        title={title}
                        subtitle={subtitle}
                        logo={logo}
                        link={link}
                    />
                </GradientBox>
            </Box>

            <Divider variant="middle" />
        </>
    )
}
export default ChallengeDetail
