import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import { login } from "../../actions/login-actions";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    height: 850,
  },
  image: {
    backgroundImage: `url(${require("../../images/yang.jpg")})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fixedHeight: {
    height: 850,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// 判断登录的值是否为空值
// eslint-disable-next-line
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

function Login(props) {
  const classes = useStyles();
  const { login, errors, isAuthenticated } = props;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  let newUser = {
    Username: username,
    Password: password,
  };

  function handleSubmit(event) {
    if (localStorage.jwToken) {
      console.log("请不要重复点击登录！");
      // history.replace(from);
      event.preventDefault();
      return false;
    }
    login(newUser);
    event.preventDefault();
  }

  useEffect(() => {
    if (localStorage.jwToken) {
      navigate.replace(from);
    }
  }, [from, navigate, isAuthenticated]);

  return (
    <Container maxWidth="xxl">
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} lg={8} className={classes.image} />
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
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(String(e.target.value))}
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
                onChange={(e) => setPassword(String(e.target.value))}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {errors.map((error) =>
                error.code ? (
                  <Typography component="p" variant="h6" key={error.msg}>
                    {error.msg}
                  </Typography>
                ) : (
                  <Typography component="p" variant="h6" key={error}>
                    {error.Error}
                  </Typography>
                )
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // onClick={e => {
                //   loginUser(newUser);
                //   history.replace(from);
                //   e.preventDefault();
                // }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
});

const mapStateToProps = (state) => ({
  errors: state.loginReducer.errors,
  isAuthenticated: state.loginReducer.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
