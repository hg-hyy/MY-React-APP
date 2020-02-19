import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  root1: {
    "& > *": {
      margin: theme.spacing(1),
      width: 500
    }
  },
  root2: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  form: {
    // overflow:"auto",
    background: "linear-gradient(to right,#EA8D8D, #A890FE)",
    borderRadius: 5,
    width: 432
  },
  grow: {
    flexGrow: 1
  },
}));

function DialogSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [pdt, setPdt] = React.useState("");
  const { carts, delCart } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Dialog
      </Button>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{pdt}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
              <Select
                labelId="demo-label"
                id="demo-simple-select-outlined"
                value={pdt}
                // displayEmpty
                onChange={e => setPdt(String(e.target.value))}
              >
                {carts.length === 0 ? (
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                ) : (
                  carts &&
                  carts.map(cart => (
                    <MenuItem key={cart.product} value={cart.product}>
                      {cart.product}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => {
              delCart(pdt);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function CartForm(props) {
  const { carts, addCart, updCart, delCart,delCartByID,seleteFromCart } = props;
  const classes = useStyles();
  const queueRef = React.useRef([]);
  const [id, setId] = useState(1);
  const [proudct, setProudct] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [unitCost, setUnitCost] = useState(100);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };
  const handleExited = () => {
    processQueue();
  };

  const handleClick = message => () => {
    queueRef.current.push({
      message,
      key: new Date().getTime()
    });

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDel=()=>{
    delCartByID(id)
  }
  const handleSelect=()=>{
    seleteFromCart(proudct)
  }

  const Alert = (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={5} lg={9}>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            // if (!input.value.trim()) {
            //   return;
            // }
            if (!proudct && quantity && unitCost) {
              return;
            }
            addCart(proudct, quantity, unitCost);
            // input.value = "";
          }}
        >
          {/* <input ref={node => (input = node)} /> */}
          <TextField
            id="proudct"
            label="proudct"
            style={{ padding: 5 }}
            placeholder="Placeholder"
            helperText="名称!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            value={proudct}
            onChange={e => setProudct(String(e.target.value))}
          />
          <TextField
            id="quantity"
            label="quantity"
            style={{ padding: 5 }}
            placeholder="Placeholder"
            helperText="数量!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          />
          <TextField
            id="unitCost"
            label="unitCost"
            style={{ padding: 5 }}
            placeholder="Placeholder"
            helperText="单价!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            value={unitCost}
            onChange={e => setUnitCost(Number(e.target.value))}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="pid">
              ID
            </InputLabel>
            <Select
              labelId="pid"
              id="demo-simple-select-outlined"
              value={id}
              // displayEmpty
              onChange={e => setId(Number(e.target.value))}
              labelWidth={labelWidth}
            >
              {carts.length === 0 ? (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              ) : (
                carts &&
                carts.map(cart => (
                  <MenuItem key={cart.id} value={cart.id}>
                    {cart.id}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-label">
              product
            </InputLabel>
            <Select
              labelId="demo-label"
              id="demo-simple-select-outlined"
              value={proudct}
              // displayEmpty
              onChange={e => setProudct(String(e.target.value))}
              labelWidth={labelWidth}
            >
              {carts.length === 0 ? (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              ) : (
                carts &&
                carts.map(cart => (
                  <MenuItem key={cart.product} value={cart.product}>
                    {cart.product}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* <Box
            display="flex"
            p={1}
            bgcolor="background.paper"
            justifyContent="center"
            alignItems="center"
          ></Box> */}
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction
              label="Add"
              icon={<AddIcon />}
              type="submit"
              onClick={handleClick("新增一条记录！")}
            />
            <BottomNavigationAction
              label="Update"
              icon={<EditIcon />}
              onClick={() => {
                updCart(id, proudct, quantity, unitCost);
              }}
            />
            <BottomNavigationAction
              label="Select"
              icon={<EditIcon />}
              onClick={
                handleSelect
              }
            />
            <BottomNavigationAction
              label="Delete"
              icon={<RemoveIcon />}
              onClick={handleDel}
            />
          </BottomNavigation>
         
        </form>
        {Alert}
        {/* <ConsecutiveSnackbars/> */}
      </Grid>
      <Grid item xs={4} lg={2}>
        <DialogSelect carts={carts} delCart={delCart} />
      </Grid>
    </Grid>
  );
}
