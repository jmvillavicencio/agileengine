const { DEBIT_TRANSACTION, CREDIT_TRANSACTION } = require('../../constants');

// This is to emulate a transactional queue. I'm not implementing the process that get elements from queue.
const transactionsQueue = [];

// I create only one user because test task is based on transactions management
const user = {
  name: '',
  id: null,
  email: '',
  transactions: [],
  currentBalance: 0,
  account: '3590021978554',
  transactionLock: null,
  releaseLock,
  addTransaction,
  create,
};

function encryptPassword() {
  return 'SOME_ENCTRYPTED_PSW';
}

function releaseLock() {
  this.transactionLock = null;
}

function addTransaction(transaction, type = DEBIT_TRANSACTION) {
  if (!transaction || !transaction.amount || !transaction.destinationAccount || Number.isNaN(transaction.amount)) {
    throw new Error('INVALID_TRANSACTION');
  }
  if (this.transactionLock) {
    transactionsQueue.push({
      transaction, type,
    });
    return;
  }
  this.transactionLock = new Date();
  const { amount } = transaction;
  const absoluteAmount = Math.abs(amount);
  const signedAmount = type === DEBIT_TRANSACTION ? (absoluteAmount * -1) : absoluteAmount;
  const copyOfTransaction = {
    ...transaction,
    amount: signedAmount,
    date: new Date(),
  };
  const balance = this.currentBalance + copyOfTransaction.amount;
  if (balance < 0) {
    this.releaseLock();
    throw new Error('INVALID_TRANSACTION_NO_FUNDS');
  }
  this.currentBalance = balance;
  this.transactions.push(copyOfTransaction);
  this.releaseLock();
}


function create(data) {

  if (!data) {
    throw new Error('INVALID_USER');
  }
  const { password, email } = data;
  if (!password || !email || password.length > 10 || !/.+@.+\..+/.test(email)) {
    throw new Error('INVALID_USER');
  }
  user.password = encryptPassword(password);
  user.email = email;
  user.id = Math.random().toString(36).substr(2, 9);

  // I add some transactions here to demostrate functionality and add some credit to user
  user.addTransaction({
    destinationAccount: '1234556',
    amount: 700,
  }, CREDIT_TRANSACTION);
  user.addTransaction({
    destinationAccount: '1234556',
    amount: 800,
  }, CREDIT_TRANSACTION);
}

module.exports = {
  get: () => {
    return user;
  },
  create,
};
