const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = function setup(app) {
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
};
