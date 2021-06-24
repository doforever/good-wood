import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({ products }) => products.data;
export const getCurrent = ({ products }, id) => products.current && products.current.id === id ? products.current : null;
export const getRequest = ({ products }) => products.request;

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_REQUEST = createActionName('START_REQUEST');
const ALL_FETCHED = createActionName('ALL_FETCHED');
const ONE_FETCHED = createActionName('ONE_FETCHED');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');

/* action creators */
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const allFetched = payload => ({ payload, type: ALL_FETCHED });
export const oneFetched = payload => ({ payload, type: ONE_FETCHED });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });

/* thunk creators */
export const fetchAll = () => {
  return async (dispatch) => {
    dispatch(startRequest('GET_ALL'));
    try {
      let res = await axios.get(`${API_URL}/api/products`, { withCredentials: true });
      dispatch(allFetched(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const fetchOne = id => {
  return async dispatch => {
    dispatch(startRequest('GET_ONE'));
    try {
      let res = await axios.get(`${API_URL}/api/products/${id}`, { withCredentials: true });
      dispatch(oneFetched(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
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
    case ALL_FETCHED: {
      const products = action.payload.map(({ _id, ...other }) => ({ id: _id, ...other }));
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
        },
        data: products,
      };
    }
    case ONE_FETCHED: {
      const { _id, ...other } = action.payload;
      const productData = { id: _id, ...other };
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
        },
        current: productData,
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

    default:
      return statePart;
  }
};
