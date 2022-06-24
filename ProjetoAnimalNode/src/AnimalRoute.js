const AnimalController = require('./AnimalController');

module.exports = (app) => {
    app.post('/animal', AnimalController.post);
    app.put('/animal/:id', AnimalController.put);
    app.delete('/animal/:id', AnimalController.delete);
    app.get('/animal', AnimalController.get);
    app.get('/animal/:id', AnimalController.getById);
}