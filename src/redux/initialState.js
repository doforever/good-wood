export const initialState = {
  products: {
    data: [],
    lastFetchAll: null,
    current: null,
    request: {
      type: '',
      active: false,
      error: false,
    },
  },
  cart: {
    data: {
      id: '',
      products: [],
    },
    request: {
      type: '',
      active: false,
      error: false,
    },
  },
  order: {
    data: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    },
    request: {
      type: '',
      active: false,
      error: false,
    },
  },
};
