import React from 'react';

import {
    Card,
    Button,
    Avatar,
    CardContent,
    CardActions,
    List
} from '@material-ui/core';

import { Typography } from 'antd';
// import { userInfo } from 'os';

const ResultCard = ({ data, onClick }) => {
    const skills =
        data.skills.map(item => {
            return ' ' + item.skill + ' (' + item.level + ')';
        }).join(', ');

    const roles =
        data.roles.map(item => {
            return ' ' + item.role + ' years: ' + item.years;
        }).join(', ');


    return (
        <Card>
            <CardContent>
                <Avatar src={data.profile.profilePicture} />
                <Typography component="h2">
                    {data.profile.firstName} {data.profile.lastName}
                </Typography>
                <Typography component="h3">
                    {data.profile.countryOfResidence}
                </Typography>
                <Typography>{data.profile.bio}</Typography>
                <List>{skills}</List>
                <List>{roles}</List>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button onClick={onClick}>Details</Button>
            </CardActions>
        </Card>
    );
};

export default ResultCard;
