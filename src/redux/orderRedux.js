import axios from 'axios';
import { API_URL } from '../config.js';

/* selectors */
export const getOrder = ({ order }) => order.data;
export const getProducts = ({ order }) => order.data.products;
export const getRequest = ({ order }) => order.request;
export const getCount = ({order}) => {
  let count = 0;
  for (let p of order.data.products) {
    count += p.amount;
  }
  return count;
};
export const canAddProducts = ({order}, id, amount) => {
  const product = order.data.products.find(p => p.id === id);
  if (product) return product.amount + amount <= 50;
  else return true;
};

/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD = createActionName('ADD');
const REMOVE = createActionName('REMOVE');
const PLUS = createActionName('PLUS');
const MINUS = createActionName('MINUS');
const START_REQUEST = createActionName('START_REQUEST');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');
const STORE_INPUT = createActionName('STORE_INPUT');
const SAVED = createActionName('SAVED');
const COMMENT = createActionName('COMMENT');

/* action creators */
export const addProduct = payload => ({ payload, type: ADD });
export const removeProduct = payload => ({ payload, type: REMOVE });
export const plusOne = payload => ({ payload, type: PLUS });
export const minusOne = payload => ({ payload, type: MINUS });
export const storeInput = payload => ({ payload, type: STORE_INPUT });
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const orderSaved = payload => ({ payload, type: SAVED });
export const commentProduct = payload => ({ payload, type: COMMENT });

/* thunk creators */
export const sendOrder = (orderData) => {
  return async dispatch => {
    dispatch(startRequest('POST'));
    try {
      const res = await axios.post(`${API_URL}/api/orders`, orderData);
      dispatch(orderSaved(res.data));
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
    case REMOVE: {
      const newProducts = statePart.data.products.filter( p => p.id !== action.payload );
      return {
        ...statePart,
        data: {
          ...statePart.data,
          products: newProducts,
        },
      };
    }
    case STORE_INPUT: {
      return {
        ...statePart,
        data: {
          ...statePart.data,
          ...action.payload,
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
    case SAVED: {
      return {
        data: {
          products: [],
          firstName: '',
          lastName: '',
          email: '',
          address: '',
        },
        request: {
          ...statePart.request,
          active: false,
          error: false,
        },
      };
    }
    case COMMENT: {
      const newProducts = statePart.data.products
        .map(p => p.id === action.payload.id ? {...p, comment: action.payload.comment } : p );
      return {
        ...statePart,
        data: {
          ...statePart.data,
          products: newProducts,
        },
      };
    }
    default:
      return statePart;
  }
};
