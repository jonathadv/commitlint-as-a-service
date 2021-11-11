const controllers = require('./controllers');

module.exports = (app) => {
    app.post('/', controllers.post);    
    app.get('/', controllers.getJson);
    app.get('/txt', controllers.getTxt);
 }