// import React, { useEffect } from 'react'

// import { makeStyles } from '@material-ui/core/styles'
// import { Box } from '@material-ui/core'
// import { useSelector } from 'react-redux'

// import SearchResults from './SearchResults'
// // import Filters from './Filters'
// import Container from 'components/generic/Container'
// import PageWrapper from 'components/layouts/PageWrapper'

// import * as RecruitmentSelectors from 'redux/recruitment/selectors'
// import * as AuthSelectors from 'redux/auth/selectors'

// //import ToggleFavorites from './ToggleFavorites'
// import { useTranslation } from 'react-i18next'
// import { useToggle } from 'hooks/customHooks'

// const useStyles = makeStyles(theme => ({
//     root: {
//         flex: 1,
//         backgroundColor: theme.palette.background.default,
//         padding: theme.spacing(3),
//     },
// }))

// export default () => {
//     const { t } = useTranslation()
//     const classes = useStyles()
//     const idTokenData = useSelector(AuthSelectors.idTokenData)
//     const favorites = useSelector(RecruitmentSelectors.favorites)

//     const [showFavorites, toggleFavorites] = useToggle(false)

//     useEffect(() => {
//         console.log('accessing recruitment', idTokenData)
//         if (!idTokenData) {
//             throw new Error(t('Invalid_token_'))
//         }
//         if (!(idTokenData.recruiter_events?.length > 0)) {
//             throw new Error(t('Invalid_access_'))
//         }
//     }, [idTokenData, t])
//     //TODO fix this mayhem
//     return (
//         <>
//             <PageWrapper loading={false}>
//                 {/* {<Container center>
//                 <Box
//                     display="flex"
//                     flexDirection="row"
//                     justifyContent="flex-end"
//                     mb={2}
//                 >
//                     <ToggleFavorites
//                         count={favorites.length}
//                         active={showFavorites}
//                         onChange={toggleFavorites}
//                     />
//                 </Box>
//                 {showFavorites ? (
//                     <SearchResults items={favorites} />
//                 ) : (
//                     <>
//                         <Filters />
//                         <SearchResults />
//                     </>
//                 )}
//             </Container>} */}
//                 <SearchResults />
//             </PageWrapper>
//         </>
//     )
// }
































import React, { useEffect, useRef } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from 'components/generic/PageHeader'
import GradientBox from 'components/generic/GradientBox'
import { Grid, Typography } from '@material-ui/core'

export default () => {




    return (
        <>
            {/* button for DEV to swithc between participant / partner view */}
            {/* <Button
                onClick={() => setIsPartner(!isPartner)}
                color="primary"
                variant="contained"
            >
                Switch between participant / partner view (only for dev)
            </Button> */
            }
            <div className="recruitment">
                <iframe src="/recruitment" width='100%;' height='1500;' frameborder='0'></iframe>
            </div>
        </>
    )
}