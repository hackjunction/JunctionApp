import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Divider
} from "@material-ui/core";

import Markdown from "components/generic/Markdown";

import PageHeader from "components/generic/PageHeader";
import PageWrapper from "components/layouts/PageWrapper";

import { OutboundLink } from "react-ga";

import styles from "../EventDashboard.module.scss";

import Partners from "constants/hackerpack-partners.js";

const Hackerpack = () => {
  const CompanySection = ({ name, icon, description, link }) => {
    return (
      <Grid container item direction="row" spacing={5}>
        <Grid item xs={4}>
          <img alt={name} src={icon} className={styles.companyLogo} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">{name}</Typography>
          <Typography>
            <Markdown source={description} />
          </Typography>
          <Box className={styles.outboundLink}>
            <OutboundLink eventLabel="myLabel" to={link} target="_blank">
              <Button color="secondary" variant="contained">
                Redeem
              </Button>
            </OutboundLink>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <PageHeader
        heading="Hackerpack"
        subheading="We want you to be able to fully focus on making your hackathon project as cool as possible! These software provided by our partners will help you unleash your creativity and maximize your learning during our events."
      />
      <PageWrapper loading={false}>
        <Divider variant="middle" className={styles.divider} />
        {Partners.map(company => (
          <React.Fragment>
            <Box p={2}>
              <CompanySection
                name={company.name}
                description={company.description}
                icon={company.icon}
                link={company.link}
              />
            </Box>
            <Divider variant="middle" className={styles.divider} />
          </React.Fragment>
        ))}
        <Box p={2}>
          <Typography color="textSecondary" variant="subtitle1">
            Anything you would like to see in the future? Contact us at
            tapio@tapio.com and we try our best to get it here.
          </Typography>
        </Box>
      </PageWrapper>
    </React.Fragment>
  );
};

export default Hackerpack;
