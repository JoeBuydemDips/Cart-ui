const reducer = (state, action) => {
  //clear cart function
  if (action.type == "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  //Remove item function
  if (action.type == "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  //increase item function
  if (action.type == "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }
  //decrease item function
  if (action.type == "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount != 0);

    return { ...state, cart: tempCart };
  }
  if (action.type == "GET_TOTALS") {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2)); //reduced to 2 decimal places

    return { ...state, amount, total };
  }
  if (action.type == "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type == "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  return state;
};

export default reducer;
