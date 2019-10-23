import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import Image from 'components/generic/Image';
import Button from 'components/generic/Button';

import { withSnackbar } from 'notistack';
import { Typography, Grid } from '@material-ui/core';

import styles from './RecruitmentUserModal.module.scss';

import PageWrapper from 'components/layouts/PageWrapper';

import RecruitmentProfileInfo from './RecruitmentProfileInfo';

import * as AuthSelectors from 'redux/auth/selectors';

import UserProfilesService from 'services/userProfiles';

import { toggleFavorite } from 'redux/recruitment/actions';

const RecruitmentUserModal = ({ idToken, profileId, onClose, event }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [participant, setParticipant] = useState();

    useEffect(() => {
        console.log('id:', profileId);
        if (profileId) {
            setLoading(true);
            UserProfilesService.getUserProfileRecruitment(profileId, idToken)
                .then(data => {
                    setParticipant(data);
                    console.log(data);
                })
                .catch(err => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [idToken, profileId]);

    const participantName = useMemo(() => {
        if (!participant) return '';
        const { firstName, lastName } = participant.profile;
        return `${firstName} ${lastName}`;
    }, [participant]);

    const participantSubheading = useMemo(() => {
        if (!participant) return '';
        return participant.profile.countryOfResidence;
    }, [participant]);

    const participantImageUrl = useMemo(() => {
        if (!participant) return '';
        return participant.profile.avatar;
    }, [participant]);

    const { education, roles } = participant || {};

    return (
        <Modal isOpen={!!profileId} handleClose={onClose} size="max" title="Profile details">
            <PageWrapper loading={loading || !participant} error={error}>
                <Button block text="Add to favorites" button={{ onClick: () => toggleFavorite(profileId, idToken) }} />
                <Grid container direction="row" justify="space-around">
                    <Grid item sm={8} md={8} lg={8}>
                        <Typography variant="h3">{participantName}</Typography>
                        <Typography variant="subtitle1">{participantSubheading}</Typography>
                        {education && education.level && (
                            <Grid item mb={1}>
                                <Typography variant="h6">Education</Typography>
                                <Typography>
                                    {education.level} in {education.degree}, {education.university} (
                                    {education.graduationYear})
                                </Typography>
                            </Grid>
                        )}
                        {roles && roles.length !== 0 && (
                            <Grid item mb={1}>
                                <Typography variant="h6">Previous roles</Typography>
                                {roles.map(a => {
                                    return <Typography>{a.role}</Typography>;
                                })}
                            </Grid>
                        )}
                    </Grid>
                    <Grid item sm={4} md={4} lg={4}>
                        <Image
                            url={participantImageUrl}
                            defaultImage="https://avatars1.githubusercontent.com/u/11797156?s=460&v=4"
                            alt="Profile picture"
                            className={styles.profilePic}
                        />
                    </Grid>
                </Grid>
                <RecruitmentProfileInfo participant={participant} />
            </PageWrapper>
        </Modal>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state)
});

export default withSnackbar(connect(mapState)(RecruitmentUserModal));
