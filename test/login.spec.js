/* eslint-disable no-unused-expressions */

module.exports = {
  'Show error message if not an email': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('#app')
      .setValue('[name="email"]', 'notanemail')
      .keys(client.Keys.ENTER)
      .assert.containsText('.v-messages.error--text .v-messages__message', 'E-mail must be valid')
      .end();
  },
  'Show error message if password is too long': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('#app')
      .setValue('[name="email"]', 'an@email.com')
      .setValue('[name="password"]', 'aninvalidlongpassword')
      .keys(client.Keys.ENTER)
      .assert.containsText('.v-messages.error--text .v-messages__message', 'Password must be less than 10 characters')
      .end();
  },
  'Redirect to New Transaction if everything is ok': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('#app')
      .setValue('[name="email"]', 'an@email.com')
      .setValue('[name="password"]', 'avalidpassword')
      .keys(client.Keys.ENTER)
      .assert.urlContains('/transaction/new')
      .end();
  },
};
