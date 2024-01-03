import React, { useState, useCallback, useMemo } from 'react'

import {
    Paper,
    Grid,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core'
import getSlug from 'speakingurl'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'
import MarkdownInput from 'components/inputs/MarkdownInput'
import ImageUpload from 'components/inputs/ImageUpload'
import { SettingsBrightnessSharp } from '@material-ui/icons'

export default ({ value, onChange }) => {
    const [name, setName] = useState(undefined)
    const [slug, setSlug] = useState(undefined)
    const [partner, setPartner] = useState(undefined)
    const [partnerEmail, setPartnerEmail] = useState("dev@hackjunction.com")//TODO: remove partner email entirely
    const [title, setTitle] = useState(undefined)
    const [subtitle, setSubtitle] = useState(undefined)
    const [description, setDescription] = useState(undefined)
    const [insights, setInsights] = useState(undefined)
    const [resources, setResources] = useState(undefined)
    const [prizes, setPrizes] = useState(undefined)
    const [criteria, setCriteria] = useState(undefined)
    const [companyInfo, setCompanyInfo] = useState(undefined)
    const [logo, setLogo] = useState(undefined)

    const [editIndex, setEditIndex] = useState(-1)
    const [editing, setEditing] = useState(false)

    const handleNameChange = useCallback(name => {
        setName(name)
        setSlug(getSlug(name))
    }, [])

    const handleAdd = useCallback(() => {
        handleNameChange(name)
        setEditing(true)
    }, [handleNameChange, name])

    const handleRemove = useCallback(
        index => {
            onChange(
                value.filter((item, idx) => {
                    return idx !== index
                }),
            )
        },
        [value, onChange],
    )

    const handleEditStart = useCallback(
        index => {
            setEditIndex(index)
            setEditing(true)
            setName(value[index].name)
            setPartner(value[index].partner)
            setPartnerEmail(value[index].partnerEmail)
            setSlug(value[index].slug)
            setTitle(value[index].title)
            setSubtitle(value[index].subtitle)
            setDescription(value[index].description)
            setInsights(value[index].insights)
            setResources(value[index].resources)
            setPrizes(value[index].prizes)
            setCriteria(value[index].criteria)
            setCompanyInfo(value[index].companyInfo)
            setLogo(value[index].logo)
        },
        [value],
    )

    const handleEditCancel = useCallback(() => {
        setEditIndex(-1)
        setEditing(false)
        setName(undefined)
        setPartner(undefined)
        setPartnerEmail(undefined)
        setTitle(undefined)
        setSubtitle(undefined)
        setDescription(undefined)
        setInsights(undefined)
        setResources(undefined)
        setPrizes(undefined)
        setCriteria(undefined)
        setCompanyInfo(undefined)
        setLogo(undefined)
    }, [])

    const handleEditDone = useCallback(() => {
        if (editIndex > -1) {
            onChange(
                value.map((item, index) => {
                    if (index === editIndex) {
                        return {
                            ...item,
                            name,
                            partner,
                            partnerEmail,
                            slug,
                            title,
                            subtitle,
                            description,
                            insights,
                            resources,
                            prizes,
                            criteria,
                            companyInfo: companyInfo,
                            logo,
                        }
                    }
                    return item
                }),
            )
        } else {
            onChange(
                value.concat({
                    name,
                    partner,
                    partnerEmail,
                    slug,
                    title,
                    subtitle,
                    description,
                    insights,
                    resources,
                    prizes,
                    criteria,
                    companyInfo: companyInfo,
                    logo,
                }),
            )
        }
        handleEditCancel()
    }, [
        editIndex,
        handleEditCancel,
        onChange,
        value,
        name,
        partner,
        partnerEmail,
        slug,
        title,
        subtitle,
        description,
        insights,
        resources,
        prizes,
        criteria,
        companyInfo,
        logo,
    ])

    const isValid = useMemo(() => {
        return (
            partner &&
            //partnerEmail &&
            name &&
            slug &&
            value.filter((challenge, index) => {
                return (
                    index !== editIndex &&
                    (challenge.name === name || challenge.slug === slug)
                )
            }).length === 0
        )
    }, [editIndex, name, partner, /*partnerEmail,*/ slug, value])

    const renderListItem = (challenge, index) => {
        return (
            <ListItem key={challenge.slug || challenge.name} divider>
                <ListItemText
                    primary={`${challenge.name} by ${challenge.partner}`}
                    secondary={challenge.slug}
                />
                <ListItemSecondaryAction>
                    <Tooltip title="Edit challenge">
                        <IconButton onClick={() => handleEditStart(index)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove challenge">
                        <IconButton onClick={() => handleRemove(index)}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    const renderForm = () => (
        <>
            <Grid item xs={12}>
                <TextInput
                    label="Challenge name"
                    value={name}
                    onChange={handleNameChange}
                />
                <Typography variant="caption">
                    The unique publicly visible name of the challenge.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    label="Unique slug"
                    value={slug}
                    onChange={setSlug}
                />
                <Typography variant="caption">
                    A unique slug for the challenge. This will be used in e.g.
                    url paths related to this challenge.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    label="Partner name"
                    value={partner}
                    onChange={setPartner}
                />
                <Typography variant="caption">
                    Who is the partner responsible for this challenge? <b>CAUTION: </b>If you are using partner meetings or reviewing, this has to currently match <b>EXACTLY</b> to partner organization mentoring this challenge.
                </Typography>
            </Grid>
            {/* <Grid item xs={12}>
                <TextInput
                    label="Partner email"
                    value={partnerEmail}
                    onChange={setPartnerEmail}
                />
                <Typography variant="caption">
                    This email will be used for meetings with participants:
                    meeting invitations with a Google Meets link will be sent to
                    this mail.
                </Typography>
            </Grid> */}
            <Grid item xs={12}>
                <TextInput
                    label="Challenge title"
                    value={title}
                    onChange={setTitle}
                />
                <Typography variant="caption">
                    Title. Displayed in the event list.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    label="Subtitle"
                    value={subtitle}
                    onChange={setSubtitle}
                />
                <Typography variant="caption">
                    Subtitle. Displayed below title.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Description</Typography>
                <MarkdownInput
                    label="Description"
                    value={description}
                    onChange={setDescription}
                    placeholder="Description goes here"
                />
                <Typography variant="caption">
                    Challenge description.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Insights</Typography>
                <MarkdownInput
                    label="Insights"
                    value={insights}
                    onChange={setInsights}
                    placeholder="Insights go here"
                />
                <Typography variant="caption">Challenge insights.</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Resources</Typography>
                <MarkdownInput
                    label="Resources"
                    value={resources}
                    onChange={setResources}
                    placeholder="Resource go here"
                />
                <Typography variant="caption">Challenge resources.</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Prizes</Typography>
                <MarkdownInput
                    label="Prizes"
                    value={prizes}
                    onChange={setPrizes}
                    placeholder="Prizes go here"
                />
                <Typography variant="caption">Challenge Prizes.</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Criteria</Typography>
                <MarkdownInput
                    label="Criteria"
                    value={criteria}
                    onChange={setCriteria}
                    placeholder="Criteria go here"
                />
                <Typography variant="caption">Challenge criteria.</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Company Info</Typography>
                <MarkdownInput
                    label="Company Info"
                    value={companyInfo}
                    onChange={setCompanyInfo}
                    placeholder="Company info goes here"
                />
                <Typography variant="caption">Company Info</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Logo</Typography>
                <Box width="100%" pt="33.33%" position="relative">
                    <ImageUpload
                        value={logo}
                        onChange={setLogo}
                        uploadUrl={`/api/upload/challenges/${slug}/logo`}
                        resizeMode="contain"
                    />
                </Box>
                <Typography variant="caption">
                    Challenge description.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Box
                    display="inline-flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                >
                    <Button
                        onClick={handleEditCancel}
                        color="theme_white"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </Box>
                <Box
                    display="inline-flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    marginLeft="auto"
                >
                    <Button
                        disabled={!isValid}
                        onClick={handleEditDone}
                        color="primary"
                        variant="contained"
                    >
                        Save
                    </Button>
                </Box>
            </Grid>
        </>
    )

    const renderListView = () => (
        <>
            <Grid item xs={12}>
                <List>{value.map(renderListItem)}</List>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Button
                        onClick={handleAdd}
                        color="primary"
                        variant="contained"
                    >
                        Add challenge
                    </Button>
                </Box>
            </Grid>
        </>
    )

    return (
        <Paper>
            <Box p={3}>
                <Grid container spacing={3}>
                    {!editing ? renderListView() : renderForm()}
                </Grid>
            </Box>
        </Paper>
    )
}
