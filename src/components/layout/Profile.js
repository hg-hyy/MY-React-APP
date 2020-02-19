import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import img from "../../images/CL/CL1.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
    justifyContent: "center",
    marginTop:10,
    padding:0
  },
  avatar: {
    width: 80,
    height: 80
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { ...rest } = props;

  const classes = useStyles();

  const user = {
    name: "",
    avatar: img,
    bio: ""
  };

  return (
    <div {...rest} className={clsx(classes.root)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={Link}
        src={user.avatar}
        to="/"
      />
      <Typography className={classes.name} variant="h5">{user.bio}</Typography>
      <Typography variant="body2">{user.name}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
