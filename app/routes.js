const controllers = require("./controllers");
const middlewares = require("./middlewares");

module.exports = (app) => {
  app.get(
    "/json",
    [middlewares.logging, middlewares.requestValidation],
    controllers.getJsonFormat
  );
  app.get(
    "/text",
    [middlewares.logging, middlewares.requestValidation],
    controllers.getTextFormat
  );
};
