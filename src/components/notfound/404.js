import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import SnackbarContent from "@mui/material/SnackbarContent";
import { Container } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/lab/Alert";
import Pagination from "@mui/lab/Pagination";

function PaginationRounded() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ paddingTop: 50 }}>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function SimpleAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
      <Alert variant="filled" severity="warning">
        This is a warning alert — check it out!
      </Alert>
      <Alert variant="filled" severity="info">
        This is an info alert — check it out!
      </Alert>
      <Alert variant="filled" severity="success">
        This is a success alert — check it out!
      </Alert>
    </div>
  );
}

const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
);

const MSG = [
  "AAAAAAAAA",
  "BBBBBBBBB",
  "I love snacks,but the page is NOT FOUND !!!!!!",
  "I love candy. I love cookies. I love cupcakes.I love cheesecake. I love chocolate.",
];

function LinearBuffer() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progress = React.useRef(() => {});
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setCompleted(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
      <LinearProgress
        variant="buffer"
        value={completed}
        valueBuffer={buffer}
        color="secondary"
      />
    </div>
  );
}

function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
        h1. 404 PAGE IS NotFound
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. PAGE IS NotFound
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. PAGE IS NotFound
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. PAGE IS NotFound
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. PAGE IS NotFound
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. PAGE IS NotFound
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </div>
  );
}
export default function NotFound() {
  const classes = useStyles();

  return (
    <Container fixed>
      <Types />
      <LinearBuffer />
      <SimpleAlerts />
      <div className={classes.root} style={{ marginTop: 50 }}>
        {MSG.map((msg) => (
          <SnackbarContent message={msg} action={action} key={msg} />
        ))}
      </div>
      <PaginationRounded />
    </Container>
  );
}
