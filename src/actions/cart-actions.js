export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const SELETE_FROM_CART = "SELETE_FROM_CART";
export const DELETE_FROM_CART_ID = "DELETE_FROM_CART_ID";

let productID = 3

export function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    payload: {id:productID++ ,product, quantity, unitCost },
    
  };
}
export function updateCart(id,product, quantity, unitCost) {
  return {
    type: UPDATE_CART,
    payload: {
      id,
      product,
      quantity,
      unitCost
    }
  };
}
export function deleteFromCartByID(id) {
  return {
    type: DELETE_FROM_CART_ID,
    payload: {
      id
    }
  };
}
export function deleteFromCart(product) {
  return {
    type: DELETE_FROM_CART,
    payload: {
      product
    }
  };
}
export function seleteFromCart(product) {
  return {
    type: SELETE_FROM_CART,
    payload: {
      product
    }
  };
}
