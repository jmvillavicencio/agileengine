const errors = {
  INVALID_TRANSACTION_NO_FUNDS: 'No funds in your account',
  INVALID_USER: 'Invalid user authentication',
};

export default {
  methods: {
    handleAPIError(type) {
      const errorText = errors[type];
      return errorText || type;
    },
  },
};
