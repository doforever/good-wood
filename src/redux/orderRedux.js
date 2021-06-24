import axios from 'axios';
import { API_URL } from '../config.js';

/* selectors */
export const getOrder = ({ order }) => order.data;
export const getRequest = ({ order }) => order.request;

/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_REQUEST = createActionName('START_REQUEST');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');
const STORE_INPUT = createActionName('STORE_INPUT');
const SAVED = createActionName('SAVED');

/* action creators */
export const storeInput = payload => ({ payload, type: STORE_INPUT });
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const orderSaved = payload => ({ payload, type: SAVED });

/* thunk creators */
export const sendOrder = (orderData) => {
  return async dispatch => {
    dispatch(startRequest('POST'));
    try {
      const res = await axios.post(`${API_URL}/api/orders`, orderData, { withCredentials: true });
      dispatch(orderSaved(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
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
