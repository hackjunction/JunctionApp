import React, { Component } from 'react';
import './style.scss';

import UserProfileForm from 'components/UserProfileForm';

class AccountEditProfile extends Component {
    render() {
        return (
            <div className="AccountEditProfile">
                <h2 className="AccountEditProfile--title">Edit your profile</h2>
                <UserProfileForm />
            </div>
        );
    }
}

export default AccountEditProfile;
