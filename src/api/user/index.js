import axios from 'axios';

const API = process.env.VUE_APP_API_URL;

async function authenticate(credentials) {
  const { data } = await axios({
    url: `${API}/account/authenticate`,
    method: 'POST',
    data: credentials,
  });
  return data;
}

async function getById(userId) {
  const { data } = await axios({
    url: `${API}/account/by/userId/${userId}`,
    method: 'GET',
  });
  return data;
}

async function sendTransaction(userId, transaction) {
  const { data } = await axios({
    url: `${API}/account/transaction`,
    method: 'POST',
    data: {
      userId,
      amount: transaction.amount,
      destinationAccount: transaction.destinationAccount,
      type: transaction.type,
    },
  });
  return data;
}

export default {
  getById,
  authenticate,
  sendTransaction,
};
