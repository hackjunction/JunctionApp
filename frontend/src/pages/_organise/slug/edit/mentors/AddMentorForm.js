import React, { useCallback, useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import MentorService from 'services/mentors'

import * as AuthSelectors from 'redux/auth/selectors'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
    topWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        borderRadius: '7px',
        boxShadow: '2px 7px 15px rgba(0, 0, 0, 0.12)',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
    },
    box: {
        background: 'white',
        borderRadius: '7px',
        boxShadow: '2px 7px 30px rgba(0, 0, 0, 0.12)',
        padding: theme.spacing(3),
    },
    imageUpload: {
        width: '300px',
        height: '300px',
    },
}))

export default () => {
    const match = useRouteMatch()

    // const { t } = useTranslation()
    const slug = match.path.slice(10).split('/')[0].toString()
    const idToken = useSelector(AuthSelectors.getIdToken)

    // const event = useSelector(OrganiserSelectors.event)

    // const [initialData, setInitialData] = useState({})

    const [name, setName] = useState('test')
    const [phoneNumber, setPhoneNumber] = useState(234235)
    const [link, setLink] = useState('etest')
    const [email, setEmail] = useState('testts')

    const handleNameChange = event => {
        setName(event.target.value)
    }
    const handlePhoneNumberChange = event => {
        setPhoneNumber(event.target.value)
    }
    const handleLinkChange = event => {
        setLink(event.target.value)
    }
    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const addMentor = event => {
        event.preventDefault()
        console.log('Match:', match)
        console.log('Match.path', match.path.slice(10).split('/')[0])
        console.log('SLUG: ', slug)
        // console.log('EVENT:', event)
        createMentor({
            name: name,
            phoneNumber: phoneNumber,
            link: link,
            email: email,
            slug: slug,
        })

        // setName('')
        // setPhoneNumber(null)
        // setLink('')
        // setEmail('')
    }

    // const idToken = useSelector(AuthSelectors.getIdToken)

    const createMentor = async mentorObject => {
        try {
            console.log('MentorObject', mentorObject)
            const mentor = await MentorService.createMentorsBySlug(idToken, {
                name: mentorObject.name,
                phoneNumber: mentorObject.phoneNumber,
                link: mentorObject.link,
                email: mentorObject.email,
                slug: mentorObject.slug,
            })
            console.log('Mentor', mentor)

            // setBlogs(blogs.concat(blog))
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        // <Formik
        //     validationSchema={props => {
        //         return yup.lazy(values => {
        //             return yup.object().shape(validationSchema(values))
        //         })
        //     }}
        //     enableReinitialize
        //     initialValues={initialData}
        //     onSubmit={handleSubmit}
        // >
        //     {formikProps => (
        //         <>
        //             <Box className={classes.topWrapper}>
        //                 <Box flex="1" display="flex" flexDirection="column">
        //                     <Grid container spacing={3}>
        //                         <Grid item xs={12} md={6}>
        //                             <FastField
        //                                 name="name"
        //                                 render={({ field, form }) => (
        //                                     <TextInput
        //                                         label={t('Name_')}
        //                                         value={field.value}
        //                                         onChange={value =>
        //                                             form.setFieldValue(
        //                                                 field.name,
        //                                                 value
        //                                             )
        //                                         }
        //                                         onBlur={() =>
        //                                             form.setFieldTouched(
        //                                                 field.name
        //                                             )
        //                                         }
        //                                     />
        //                                 )}
        //                             />
        //                         </Grid>
        //                         <Grid item xs={12} md={6}>
        //                             <FastField
        //                                 name="description"
        //                                 render={({ field, form }) => (
        //                                     <TextInput
        //                                         label={t('Description_')}
        //                                         value={field.value}
        //                                         onChange={value =>
        //                                             form.setFieldValue(
        //                                                 field.name,
        //                                                 value
        //                                             )
        //                                         }
        //                                         onBlur={() =>
        //                                             form.setFieldTouched(
        //                                                 field.name
        //                                             )
        //                                         }
        //                                     />
        //                                 )}
        //                             />
        //                         </Grid>
        //                         <Grid item xs={12} md={6}>
        //                             <FastField
        //                                 name="icon"
        //                                 render={({ field, form }) => (
        //                                     <Box
        //                                         width="100%"
        //                                         height="100%"
        //                                         borderRadius="50%"
        //                                         overflow="hidden"
        //                                         position="relative"
        //                                     >
        //                                         <ImageUpload
        //                                             value={
        //                                                 field.value
        //                                                     ? {
        //                                                           url:
        //                                                               field.value,
        //                                                       }
        //                                                     : undefined
        //                                             }
        //                                             onChange={value =>
        //                                                 form.setFieldValue(
        //                                                     field.name,
        //                                                     value
        //                                                         ? value.url
        //                                                         : null
        //                                                 )
        //                                             }
        //                                             uploadUrl={`/api/upload/hackerpack/${slug}/icon/`}
        //                                             resizeMode="cover"
        //                                         />
        //                                     </Box>
        //                                 )}
        //                             />
        //                         </Grid>
        //                         <Grid item xs={12} md={6}>
        //                             <FastField
        //                                 name="link"
        //                                 render={({ field, form }) => (
        //                                     <TextInput
        //                                         label={t('Link_')}
        //                                         value={field.value}
        //                                         onChange={value =>
        //                                             form.setFieldValue(
        //                                                 field.name,
        //                                                 value
        //                                             )
        //                                         }
        //                                         onBlur={() =>
        //                                             form.setFieldTouched(
        //                                                 field.name
        //                                             )
        //                                         }
        //                                     />
        //                                 )}
        //                             />
        //                         </Grid>
        //                     </Grid>
        //                 </Box>
        //             </Box>
        //             <BottomBar
        //                 onSubmit={formikProps.handleSubmit}
        //                 errors={formikProps.errors}
        //                 dirty={formikProps.dirty}
        //                 loading={formikProps.isSubmitting}
        //             />
        //         </>
        //     )}
        // </Formik>

        <form onSubmit={addMentor}>
            <div>
                <p>Name:</p>
                <input
                    type="text"
                    value={name}
                    name="Name"
                    onChange={handleNameChange}
                />
                <p>Phone-number:</p>
                <input
                    type="text"
                    value={phoneNumber}
                    name="Phone number"
                    onChange={handlePhoneNumberChange}
                />
                <p>Link:</p>
                <input
                    type="text"
                    value={link}
                    name="Link"
                    onChange={handleLinkChange}
                />
                <p>email:</p>
                <input
                    type="text"
                    value={email}
                    name="Email"
                    onChange={handleEmailChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}
