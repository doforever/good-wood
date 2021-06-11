/* selectors */
export const getCart = ({ cart }) => cart;
export const getProducts = ({ cart }) => cart.products;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD = createActionName('ADD');
const REMOVE = createActionName('REMOVE');

/* action creators */
export const addProduct = payload => ({ payload, type: ADD });
export const removeProduct = payload => ({ payload, type: REMOVE });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD: {
      const isNew = !statePart.products.some(p => p.id === action.payload.id);
      if (isNew) {
        return {
          ...statePart,
          products: [...statePart.products, action.payload],
        };
      } else {
        const newProducts = statePart.products
          .map(p => p.id === action.payload.id ? ({ ...p, amount: p.amount + action.payload.amount }) : p);
        return {
          ...statePart,
          products: newProducts,
        };
      }
    }
    case REMOVE: {
      return {
        ...statePart,
      };
    }
    default:
      return statePart;
  }
};
