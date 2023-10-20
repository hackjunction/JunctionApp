import CandidateCard from 'components/cards/CandidateCard'
import { Formik } from 'formik'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { forOwn } from 'lodash-es'

export default () => {
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 1440: 3 }}
        >
            <Masonry>
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
            </Masonry>
        </ResponsiveMasonry>
    )
}
