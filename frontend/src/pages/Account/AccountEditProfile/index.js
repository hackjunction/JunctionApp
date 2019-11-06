import React, { useCallback } from 'react';

import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ImageUpload from 'components/inputs/ImageUpload';

import * as UserSelectors from 'redux/user/selectors';
import * as UserActions from 'redux/user/actions';

const useStyles = makeStyles(theme => ({
    imageUpload: {
        width: '300px',
        height: '300px'
    }
}));

const AccountEditProfile = ({ userProfile = {}, editUserProfile }) => {
    const classes = useStyles();

    const handleAvatarChanged = useCallback(
        value => {
            if (value) {
                editUserProfile({ avatar: value.url });
            } else {
                editUserProfile({ avatar: null });
            }
        },
        [editUserProfile]
    );

    console.log('USER PROFILE', userProfile);

    return (
        <Box>
            <Box width="300px" height="300px" borderRadius="50%" overflow="hidden" position="relative">
                <ImageUpload
                    value={
                        userProfile.avatar
                            ? {
                                  url: userProfile.avatar
                              }
                            : undefined
                    }
                    onChange={handleAvatarChanged}
                    uploadUrl="/api/upload/users/avatar/"
                    resizeMode="cover"
                />
            </Box>
        </Box>
    );
};

const mapState = state => ({
    userProfile: UserSelectors.userProfile(state)
});

const mapDispatch = dispatch => ({
    editUserProfile: data => dispatch(UserActions.editUserProfile(data))
});

export default connect(
    mapState,
    mapDispatch
)(AccountEditProfile);
