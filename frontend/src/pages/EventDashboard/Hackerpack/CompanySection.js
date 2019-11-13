import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid } from "@material-ui/core";

import Markdown from "components/generic/Markdown";

import Button from "components/generic/Button";

import { OutboundLink } from "react-ga";

const useStyles = makeStyles(theme => ({
  companyLogo: {
    width: "100%"
  },
  outboundLink: {
    "& a": {
      textDecoration: "none !important"
    }
  }
}));

const CompanySection = ({ name, icon, description, link }) => {
  const classes = useStyles();

  return (
    <Grid container item direction="row" spacing={5}>
      <Grid item xs={4}>
        <img alt={name} src={icon} className={classes.companyLogo} />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h5">{name}</Typography>
        <Typography>
          <Markdown source={description} />
        </Typography>
        <Box className={classes.outboundLink}>
          <OutboundLink eventLabel="myLabel" to={link} target="_blank">
            <Button color="theme_turquoise" variant="contained">
              Redeem
            </Button>
          </OutboundLink>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompanySection;
