import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/Input";
import VisibleTodoList from "./VisibleTodoList";
import UndoRedo from "./UndoRedo";
import FilterLink from "./FilterLink";
import {
  VisibilityFilters,
  saveNewTodo,
  addTodo,
} from "../../reducers/todoSlice";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 600,
    display: "flex",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  input: { backgroundColor: "white" },
}));

const post = {
  title: "Unsplash",
  description: "The internet’s source of freely usable images.",
  image: require("../../images/olen.jpg"),
  cor: "Powered by creators everywhere.",
  imgText: "Powered by creators everywhere.",
  linkText: "Trending:Flower, Wallpapers, Backgrounds, Happy, Love.",
};

function MainFeaturedPost(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  // const { post } = props;
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${post.image})` }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: "none" }} src={post.image} alt={post.imgText} />}
      <div className={classes.overlay} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              {post.cor}
            </Typography>

            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <OutlinedInput
                className={classes.input}
                placeholder="Search free high-resolution photos"
                id="outlined-adornment-weight"
                value={values.weight}
                onChange={handleChange("weight")}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon fontSize="large" />
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                // labelWidth={0}
              />
            </FormControl>

            <Typography variant="body2" color="inherit" paragraph>
              {post.linkText}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};

export default function ToDo() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <Container maxWidth="xxl" sx={{ pt: 3 }}>
      <MainFeaturedPost />
      <Paper elevation={24}>
        <Box
          sx={{
            display: "flex",
            mx: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-name"
            placeholder="add a todo"
            label="Name"
            value={todo}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            onClick={() => dispatch(addTodo(todo))}
          >
            Add Todo
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(saveNewTodo(todo))}
          >
            Save Todo
          </Button>
        </Box>
        <VisibleTodoList />

        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography variant="h6" component="span">
            Show todo:
          </Typography>
          <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
          <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
          <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            Completed
          </FilterLink>
        </Box>
        {/* <UndoRedo /> */}
      </Paper>
    </Container>
  );
}
