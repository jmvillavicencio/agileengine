require('dotenv').config({ path: '.env.development' });

const middlewareSetup = require('./api/middlewares');
const api = require('./api');

module.exports = (app) => {
  middlewareSetup(app);
  app.use('/', api);
};
