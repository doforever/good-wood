import axios from 'axios';
import { API_URL } from '../config.js';

/* selectors */
export const getOrder = ({ order }) => order.data;
export const getProducts = ({ order }) => order.data.products;
export const getRequest = ({ order }) => order.request;

/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD = createActionName('ADD');
const REMOVE = createActionName('REMOVE');
const START_REQUEST = createActionName('START_REQUEST');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');
const STORE_INPUT = createActionName('STORE_INPUT');
const SAVED = createActionName('SAVED');

/* action creators */
export const addProduct = payload => ({ payload, type: ADD });
export const removeProduct = payload => ({ payload, type: REMOVE });
export const storeInput = payload => ({ payload, type: STORE_INPUT });
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const orderSaved = payload => ({ payload, type: SAVED });

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
    case REMOVE: {
      return {
        ...statePart,
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
    default:
      return statePart;
  }
};
