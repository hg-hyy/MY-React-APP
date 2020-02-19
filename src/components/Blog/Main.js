import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Markdown from "markdown-to-jsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1)
  }
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h5"
      }
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: "h6" } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: "subtitle1" }
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: "caption", paragraph: true }
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      ))
    }
  }
};

const useStyles = makeStyles(theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  }
}));

export default function Main(props) {
  const classes = useStyles();
  const { mark, title } = props;
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {mark ? (
        <Markdown options={options} className={classes.markdown} key={1}>
          {mark}
        </Markdown>
      ) : (
        <Markdown options={options} className={classes.markdown} key={1}>
          ""
        </Markdown>
      )}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string
};
