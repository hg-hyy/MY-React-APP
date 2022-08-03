import React from "react";
import AddToCart from "./AddCart";
import { connect } from "react-redux";
import {
  addToCart,
  updateCart,
  deleteFromCart,
  deleteFromCartByID,
  seleteFromCart,
} from "../../actions/cart-actions";

function Cart(props) {
  return <AddToCart {...props} />;
}
// console.log("initial state: ", store.getState());
// let unsubscribe = store.subscribe(() => console.log(store.getState()));
// unsubscribe();
const mapStateToProps = (state) => ({
  carts: state.cartReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  addCart: (product, quantity, unitCost) =>
    dispatch(addToCart(product, quantity, unitCost)),
  updCart: (product, quantity, unitCost) =>
    dispatch(updateCart(product, quantity, unitCost)),
  delCart: (product) => dispatch(deleteFromCart(product)),
  delCartByID: (id) => dispatch(deleteFromCartByID(id)),
  seleteFromCart: (product) => dispatch(seleteFromCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
