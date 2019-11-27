const errors = {
  INVALID_TRANSACTION_NO_FUNDS: 'No funds in your account',
};

export default {
  methods: {
    handleAPIError(type) {
      return errors[type];
    },
  },
};
