module.exports = (app) => {

    const render = require('../controller/render');
    app.get('/form', render.get);
};