import React from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  matchPath,
  useLocation,
  useSearchParams,
  Outlet,
} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList("Choices", left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Chosen", right)}</Grid>
    </Grid>
  );
}

function Home() {
  return (
    <div>
      <TransferList />
    </div>
  );
}

function Rendering() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { rendering } = useParams();

  return (
    <div>
      <EditIcon fontSize="large" color="action" />
      <h3>{rendering}111</h3>
    </div>
  );
}
function Components() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { components } = useParams();

  return (
    <div>
      <PersonIcon fontSize="large" color="action" />
      <h3>{components}222</h3>
    </div>
  );
}
function Props() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { props } = useParams();

  return (
    <div>
      <ChatIcon fontSize="large" />
      <h3>{props}333</h3>
    </div>
  );
}

function SearchParams() {
  let [searchParams, setSearchParams] = useSearchParams();

  function serializeFormQuery(data) {
    let list = [];
    Object.keys(data).forEach((ele) => {
      list.push(`${ele}=${data[ele]}`);
    });
    return list.join("&");
  }
  function handleSubmit(event) {
    event.preventDefault();
    // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    let params = serializeFormQuery(event.target);
    setSearchParams(params);
    console.log(params);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        <button>提交</button>
      </form>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicid } = useParams();
  console.log(topicid);
  return (() => {
    switch (topicid) {
      case "rendering":
        return <Rendering />;
      case "components":
        return <Components />;
      case "props":
        return <Props />;
      default:
        return <ShoppingCartIcon fontSize="large" />;
    }
  })();
}

function Topics() {
  // const url = useHref();
  let location = useLocation();
  let params = useParams();
  const match = matchPath(
    {
      path: "show/nesting/topics/:topicid",
      caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
      end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    "/show/nesting/topics/:topicid"
  );
  console.log(location);
  console.log(match);
  console.log(params);
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to="rendering">Rendering</Link>
        </li>
        <li>
          <Link to="components">Components</Link>
        </li>
        <li>
          <Link to="props">Props</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default function NestingExample() {
  return (
    <div>
      <ul>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="topics">Topics</Link>
        </li>
        <li>
          <Link to="searchparams">search</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="topics" element={<Topics />}>
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an topic</p>
              </main>
            }
          />
          <Route path=":topicid" element={<Topic />} />
        </Route>
        <Route path="searchparams" element={<SearchParams />} />
      </Routes>
    </div>
  );
}
