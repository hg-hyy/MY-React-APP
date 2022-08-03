import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  updateCart,
  deleteFromCart,
  deleteFromCartByID,
  seleteFromCart,
} from "../../reducers/cartSlice";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    backgroundColor: theme.palette.primary.light,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    // color: theme.palette.text.secondary
  },
  formControl: {
    paddingLeft: theme.spacing(1),
    minWidth: 50,
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: 193.5,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

function DialogSelect(props) {
  const { dialog, handleDialogClose } = props;
  const classes = useStyles();
  const [pdt, setPdt] = useState("");
  const { carts, deleteFromCart } = props;

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={dialog}
        onClose={handleDialogClose}
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
                onChange={(e) => setPdt(String(e.target.value))}
              >
                {carts.length === 0 ? (
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                ) : (
                  carts &&
                  carts.map((cart) => (
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
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Ok
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => {
              deleteFromCart(pdt);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function CartForm(props) {
  const carts = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  const classes = useStyles();
  const queueRef = useRef([]);
  const [id, setId] = useState(1);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [unitCost, setUnitCost] = useState(100);
  const inputLabel = useRef(null);
  const [labelwidth, setLabelWidth] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [dialog, setDialog] = useState(false);

  const handleDialogOpen = () => {
    setDialog(true);
  };
  const handleDialogClose = () => {
    setDialog(false);
  };

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };
  const handleExited = () => {
    processQueue();
  };

  const handleClick = (message) => () => {
    queueRef.current.push({
      message,
      key: new Date().getTime(),
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

  const handleDel = () => {
    dispatch(deleteFromCartByID(id));
  };
  const handleSelect = () => {
    dispatch(seleteFromCart(product));
  };

  const Alert = (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
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
    <Grid>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          // if (!input.value.trim()) {
          //   return;
          // }
          if (!product && quantity && unitCost) {
            return;
          }
          console.log(product, quantity, unitCost);
          dispatch(addToCart({ product, quantity, unitCost }));
          // input.value = "";
        }}
      >
        {/* <input ref={node => (input = node)} /> */}
        <TextField
          id="product"
          label="product"
          style={{ padding: "0px 8px" }}
          placeholder="Placeholder"
          helperText="名称!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={product}
          onChange={(e) => setProduct(String(e.target.value))}
        />
        <TextField
          id="quantity"
          className={classes.formControl}
          label="quantity"
          // style={{ padding: 5 }}
          placeholder="Placeholder"
          helperText="数量!"
          // fullWidth
          // margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <TextField
          id="unitCost"
          className={classes.formControl}
          label="unitCost"
          // style={{ padding: 5 }}
          placeholder="Placeholder"
          helperText="单价!"
          // fullWidth
          // margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={unitCost}
          onChange={(e) => setUnitCost(Number(e.target.value))}
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
            onChange={(e) => setId(Number(e.target.value))}
            labelwidth={labelwidth}
          >
            {carts.length === 0 ? (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            ) : (
              carts &&
              carts.map((cart) => (
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
            value={product}
            // displayEmpty
            onChange={(e) => setProduct(String(e.target.value))}
            labelwidth={labelwidth}
          >
            {carts.length === 0 ? (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            ) : (
              carts &&
              carts.map((cart) => (
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
              dispatch(updateCart({ id, product, quantity, unitCost }));
            }}
          />
          <BottomNavigationAction
            label="Select"
            icon={<EditIcon />}
            onClick={handleSelect}
          />
          <BottomNavigationAction
            label="Delete"
            icon={<RemoveIcon />}
            onClick={handleDel}
          />
          <BottomNavigationAction
            label="Dialog"
            icon={<NoteOutlinedIcon />}
            onClick={handleDialogOpen}
          />
        </BottomNavigation>
      </form>
      {Alert}
      <DialogSelect
        carts={carts}
        deleteFromCart={() => dispatch(deleteFromCart)}
        dialog={dialog}
        handleDialogClose={handleDialogClose}
      />
    </Grid>
  );
}

export default CartForm;
