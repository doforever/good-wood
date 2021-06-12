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
  order: {
    products: [],
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  },
};
