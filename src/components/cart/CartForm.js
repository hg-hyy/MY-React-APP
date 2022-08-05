import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  updateCart,
  clearCart,
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
import ClearIcon from "@mui/icons-material/Clear";
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
import { useSnackbar } from "notistack";

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
  },
  formControl: {
    paddingLeft: theme.spacing(1),
    minWidth: 100,
    width: "20%",
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
  const { carts, clearCart } = props;

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
              clearCart(pdt);
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
  const { carts } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const queueRef = useRef([]);
  const [id, setId] = useState(0);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const inputLabel = useRef(null);
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

  const handleSubmit = (e) => {
    if (!product && quantity && unitCost) {
      return;
    }
    dispatch(addToCart({ product, quantity, unitCost }));
    e.preventDefault();
  };

  const handleoperabyid = (e) => {
    const cart = carts.find((t) => t.id === Number(e.target.value));

    setId(Number(e.target.value));
    setProduct(String(cart.product));
    setQuantity(Number(cart.quantity));
    setUnitCost(Number(cart.unitCost));
  };
  const handleoperabyp = (e) => {
    const cart = carts.find((t) => t.product === String(e.target.value));
    setProduct(e.target.value);
    setId(Number(cart.id));
    setQuantity(Number(cart.quantity));
    setUnitCost(Number(cart.unitCost));
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const openSnackbar = (message, variant, action) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      action,
    });
  };
  const action = (snackbarId) => (
    <>
      <Button
        onClick={() => {
          alert(`I belong to snackbar with id ${snackbarId}`);
        }}
      >
        Alert
      </Button>
      <Button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </Button>
    </>
  );

  return (
    <Grid sx={{ mt: 5, width: "100%" }}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="pid">
            ID
          </InputLabel>
          <Select
            labelId="pid"
            id="product-id"
            value={id}
            onChange={handleoperabyid}
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
            onChange={handleoperabyp}
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

        <TextField
          id="product"
          className={classes.formControl}
          label="product"
          placeholder="product name"
          helperText="商品名称!"
          // fullWidth
          // margin="normal"
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
          placeholder="quantity"
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
          placeholder="unitCost"
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
            onClick={openSnackbar("新增一条记录！", "success", action)}
          />
          <BottomNavigationAction
            label="Delete"
            icon={<RemoveIcon />}
            onClick={
              (() => {
                dispatch(deleteFromCartByID(id));
              },
              openSnackbar("删除一条记录！", "success", action))
            }
          />
          <BottomNavigationAction
            label="Update"
            icon={<EditIcon />}
            onClick={
              (() => {
                dispatch(updateCart({ id, product, quantity, unitCost }));
              },
              openSnackbar("更新一条记录！", "success", action))
            }
          />
          <BottomNavigationAction
            label="Clear"
            icon={<ClearIcon />}
            onClick={handleSelect}
          />

          <BottomNavigationAction
            label="Dialog"
            icon={<NoteOutlinedIcon />}
            onClick={handleDialogOpen}
          />
        </BottomNavigation>
      </form>
      <DialogSelect
        carts={carts}
        clearCart={() => dispatch(clearCart)}
        dialog={dialog}
        handleDialogClose={handleDialogClose}
      />
    </Grid>
  );
}
