module.exports = (app) => {

    const html = require('../controller/html');
    app.post('/api/v1/generate', html.create);
};