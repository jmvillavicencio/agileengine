function encryptPassword() {
  return 'SOME_ENCTRYPTED_PSW';
}

function addTransaction(transaction) {
  if (!transaction || !transaction.amount) {
    throw new Error('INVALID_TRANSACTION');
  }
  const copyOfTransaction = { ...transaction };
  copyOfTransaction.date = new Date();
  const balance = this.currentBalance + transaction.amount;
  if (balance < 0) {
    throw new Error('INVALID_TRANSACTION_NO_FUNDS');
  }
  this.currentBalance = balance;
  this.transactions.push(copyOfTransaction);
};

function create(data) {
  if (!data || !data.password || !data.email) {
    throw new Error('INVALID_USER');
  }
  this.password = encryptPassword(data.password);
  this.email = data.email;
  this.id = Math.random().toString(36).substr(2, 9);
  this.currentBalance = 1500;
};

const user = {
  name: '',
  id: null,
  email: '',
  transactions: [],
  lock: null,
  currentBalance: 0,
  account: '3590021978554',
  addTransaction,
  create,
};

module.exports = user;
