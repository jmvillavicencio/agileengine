const { DEBIT_TRANSACTION, CREDIT_TRANSACTION } = require('../../constants');

const user = {
  name: '',
  id: null,
  email: '',
  transactions: [],
  currentBalance: 0,
  account: '3590021978554',
  addTransaction,
  create,
};

function encryptPassword() {
  return 'SOME_ENCTRYPTED_PSW';
}

function addTransaction(transaction, type = DEBIT_TRANSACTION) {
  if (!transaction || !transaction.amount || !transaction.destinationAccount) {
    throw new Error('INVALID_TRANSACTION');
  }
  const { amount, destinationAccount } = transaction;
  const signedAmount = DEBIT_TRANSACTION ? (amount * -1) : amount;
  const copyOfTransaction = {
    ...transaction,
    amount: signedAmount,
    date: new Date(),
  };
  const balance = this.currentBalance + copyOfTransaction.amount;
  if (balance < 0) {
    throw new Error('INVALID_TRANSACTION_NO_FUNDS');
  }
  this.currentBalance = balance;
  this.transactions.push(copyOfTransaction);
}

function create(data) {
  if (!data) {
    throw new Error('INVALID_USER');
  }
  const { password, email } = data;
  if (!password || !email || password.length > 10 || !/.+@.+\..+/.test(email)) {
    throw new Error('INVALID_USER');
  }
  this.password = encryptPassword(password);
  this.email = email;
  this.id = Math.random().toString(36).substr(2, 9);
  this.addTransaction({
    destinationAccount: '1234556',
    amount: 700,
  }, CREDIT_TRANSACTION);
  this.addTransaction({
    destinationAccount: '1234556',
    amount: 800,
  }, CREDIT_TRANSACTION);
}



module.exports = {
  get: function () {
    return user;
  },
};
