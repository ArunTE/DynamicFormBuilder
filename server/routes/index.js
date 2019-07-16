const html = require('./html');
const render = require('./render');

module.exports = function(app) {
  html(app);
  render(app);
};
