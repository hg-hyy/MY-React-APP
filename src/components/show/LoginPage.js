import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    height: 600
  },
  root1: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      marginBottom: theme.spacing(10),
      width: "100%",
      height: 700
    }
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: `url(${require("../../images/hones.jpg")})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  fixedHeight: {
    height: 850
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const { isAuthenticated, signin } = props;
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  // eslint-disable-next-line
  const [form, setForm] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [data, setData] = useState({ msg: "", code: 0, data: {} });
  let newUser = {
    email: email,
    password: password
  };
  // eslint-disable-next-line
  let myInit = {
    method: "POST",
    body: new FormData(form)
  };

  function handleSubmit(event) {
    signin(newUser);
    event.preventDefault();
  }

  // function handleSubmit1(event) {
  //   fetch(url, myInit)
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         console.log(result);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   event.preventDefault();
  // }

  // useEffect(() => {
  //   setForm(document.getElementById("form1"));
  // }, [form]);

  useEffect(() => {
    if (isAuthenticated) {
      history.replace(from);
    }
  });

  return (
    <div style={{ height: 700 }}>
      <p>You must log in to view the page at {from.pathname}</p>
      <Container style={{ padding: 0 }} maxWidth="xl">
        <Grid container component="main" className={classes.root}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            lg={8}
            className={classes.image}
          />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={4}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit}
                id="form1"
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={e => setEmail(String(e.target.value))}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(String(e.target.value))}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {data.code === 500 ? (
                  <Typography component="p" variant="h6" key={data.code}>
                    {data.msg}
                  </Typography>
                ) : (
                  <Typography component="p" variant="h6" key={data.code}>
                    {""}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" to="">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2" to="">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
