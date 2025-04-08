const restauranteController = require('./restauranteController');

module.exports = (app) => {
    app.post('/restaurante', restauranteController.post);
    app.put('/restaurante/:id', restauranteController.put);
    app.delete('/restaurante/:id', restauranteController.delete);
    app.get('/restaurante', restauranteController.get);
    app.get('/restaurante/:id', restauranteController.getById);
};
