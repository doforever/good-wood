export const initialState = {
  products: {
    data: [],
    current: null,
    request: {
      type: '',
      active: false,
      error: false,
    },
  },
  cart: {
    products: [],
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  },
};
