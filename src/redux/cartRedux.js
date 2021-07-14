import axios from 'axios';
import { API_URL } from '../config.js';

/* selectors */
export const getCart = ({ cart }) => cart;
export const getProducts = ({ cart }) => cart.data.products;
export const getCartId = ({ cart }) => cart.data.id;
export const getRequest = ({ cart }) => cart.request;
export const getCount = ({ cart }) => {
  let count = 0;
  for (let p of cart.data.products) {
    count += p.amount;
  }
  return count;
};

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD = createActionName('ADD');
const REMOVE = createActionName('REMOVE');
const PLUS = createActionName('PLUS');
const MINUS = createActionName('MINUS');
const COMMENT = createActionName('COMMENT');
const START_REQUEST = createActionName('START_REQUEST');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');
const SAVED = createActionName('SAVED');
const FETCHED = createActionName('FETCHED');
const UPDATED = createActionName('UPDATED');
const DELETED = createActionName('DELETED');

/* action creators */
export const add = payload => ({ payload, type: ADD });
export const remove = payload => ({ payload, type: REMOVE });
export const plus = payload => ({ payload, type: PLUS });
export const minus = payload => ({ payload, type: MINUS });
export const comment = payload => ({ payload, type: COMMENT });

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const cartSaved = payload => ({ payload, type: SAVED });
export const cartFetched = payload => ({ payload, type: FETCHED });
export const cartUpdated = payload => ({ payload, type: UPDATED });
export const cartDeleted = payload => ({ payload, type: DELETED });

/* thunk creators */
export const addProduct = (cartProduct) => {
  return async dispatch => {
    dispatch(add(cartProduct));
    dispatch(saveCart());
  };
};

export const removeProduct = id => {
  return async dispatch => {
    dispatch(remove(id));
    dispatch(saveCart());
  };
};

export const plusOne = id => {
  return async dispatch => {
    dispatch(plus(id));
    dispatch(saveCart());
  };
};

export const minusOne = id => {
  return async dispatch => {
    dispatch(minus(id));
    dispatch(saveCart());
  };
};

export const commentProduct = data => {
  return async dispatch => {
    dispatch(comment(data));
    dispatch(saveCart());
  };
};

export const saveCart = () => {
  return async (dispatch, getState) => {
    const { cart } = getState();
    const dbProducts = cart.data.products
      .map(({ id, amount, comment }) => comment ? ({ product: id, amount, comment }) : ({ product: id, amount }));
    if (cart.data.id) {
      if(dbProducts.length>0){
        // update stored cart
        dispatch(startRequest('PUT'));
        try {
          const res = await axios.put(`${API_URL}/carts/stored`, { products: dbProducts }, { withCredentials: true });
          dispatch(cartUpdated(res.data));
        } catch (e) {
          dispatch(requestError(e.message || true));
        }
      } else {
        // delete stored cart
        dispatch(startRequest('DELETE'));
        try {
          await axios.delete(`${API_URL}/carts/stored`, { withCredentials: true });
          dispatch(cartDeleted());
        } catch (e) {
          dispatch(requestError(e.message || true));
        }
      }
    } else {
      // store new cart
      dispatch(startRequest('POST'));
      try {
        const res = await axios.post(`${API_URL}/carts`, { products: dbProducts }, { withCredentials: true });
        dispatch(cartSaved(res.data));
      } catch (e) {
        dispatch(requestError(e.message || true));
      }
    }
  };
};

export const fetchCart = () => {
  return async dispatch => {
    dispatch(startRequest('GET'));
    try {
      let res = await axios.get(`${API_URL}/carts/stored`, { withCredentials: true });
      dispatch(cartFetched(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD: {
      const isNew = !statePart.data.products.some(p => p.id === action.payload.id);
      if (isNew) {
        return {
          ...statePart,
          data: {
            ...statePart.data,
            products: [...statePart.data.products, action.payload],
          },
        };
      } else {
        const newProducts = statePart.data.products
          .map(p => p.id === action.payload.id ? ({ ...p, amount: p.amount + action.payload.amount }) : p);
        return {
          ...statePart,
          data: {
            ...statePart.data,
            products: newProducts,
          },
        };
      }
    }
    case PLUS: {
      const newProducts = statePart.data.products
        .map(p => p.id === action.payload && p.amount < 50 ? ({ ...p, amount: p.amount + 1 }) : p);
      return {
        ...statePart,
        data: {
          ...statePart.data,
          products: newProducts,
        },
      };
    }
    case MINUS: {
      const newProducts = statePart.data.products
        .map(p => p.id === action.payload && p.amount > 1 ? ({ ...p, amount: p.amount - 1 }) : p);
      return {
        ...statePart,
        data: {
          ...statePart.data,
          products: newProducts,
        },
      };
    }
    case COMMENT: {
      const newProducts = statePart.data.products
        .map(p => p.id === action.payload.id ? { ...p, comment: action.payload.comment } : p);
      return {
        ...statePart,
        data: {
          ...statePart.data,
          products: newProducts,
        },
      };
    }
    case REMOVE: {
      const newProducts = statePart.data.products.filter(p => p.id !== action.payload);
      return {
        ...statePart,
        data: {
          ...statePart.data,
          products: newProducts,
        },
      };
    }
    case START_REQUEST: {
      return {
        ...statePart,
        request: {
          type: action.payload,
          active: true,
          error: false,
        },
      };
    }
    case REQUEST_ERROR: {
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCHED: {
      const { _id: cartId, products } = action.payload;
      const cartProducts = products.map(({ amount, comment, product: {_id, name, defaultPrice} }) => ({
        id: _id, name, defaultPrice, amount, comment,
      }));
      return {
        data: { id: cartId, products: cartProducts },
        request: {
          ...statePart.request,
          active: false,
          error: false,
        },
      };
    }
    case SAVED: {
      return {
        data: {
          ...statePart.data,
          id: action.payload._id,
        },
        request: {
          ...statePart.request,
          active: false,
          error: false,
        },
      };
    }
    case UPDATED: {
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
        },
      };
    }
    case DELETED: {
      return {
        data: {
          id: '',
          products: [],
        },
        request: {
          type: 'DELETE',
          active: false,
          error: false,
        },
      };
    }
    default:
      return statePart;
  }
};
