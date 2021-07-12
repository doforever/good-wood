/* selectors */
export const getSearchString = ({ searchString }) => searchString;

/* action name creator */
const reducerName = 'searchString';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET = createActionName('SET');

/* action creators */
export const setSearchString = payload => ({ payload, type: SET });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case SET: {
      return action.payload;
    }
    default:
      return statePart;
  }
};
