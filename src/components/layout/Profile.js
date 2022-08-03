import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Avatar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    height: 66,
    display: "flex",
    margin: 0,
    padding: 0,
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderBottom: "2px solid red",
  },
  avatar: {
    width: 64,
    height: 64,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const { logo, logoText } = props;
  const user = {
    name: logoText,
    avatar: logo,
    bio: "TRY MORE",
  };
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={4}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={Link}
          src={user.avatar}
          to="/"
        />
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        item
        xs={4}
        spacing={1}
      >
        <Typography className={classes.name} variant="body1">
          {user.name}
        </Typography>
        <Typography variant="body2">{user.bio}</Typography>
      </Grid>
    </Grid>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
