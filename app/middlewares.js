const logger = require("./logger").logger;

const BAD_REQUEST_MESSAGE = {
  message: "missing '?msg=<commit message>' in request query string",
};

const RESOURCE_NOT_FOUND_MESSAGE = {
  message: "resource not found",
};

const INTERNAL_ERROR_MESSAGE = {
  message: "internal server error",
};

exports.logging = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    query: req.query,
    body: req.body,
  });
  next();
};

exports.requestValidation = (req, res, next) => {
  if (!req.query.msg) {
    logger.error("missing parameter 'msg' in request query string");
    res.status(400).send(BAD_REQUEST_MESSAGE);
  } else {
    next();
  }
};

exports.notFoundHandler = (req, res, next) => {
  const resource = req.url;
  logger.error(`resource "${resource}" not found`);
  res.status(404).send(RESOURCE_NOT_FOUND_MESSAGE);
};

exports.errorHandler = (err, req, res, next) => {
  res.status(500).send(INTERNAL_ERROR_MESSAGE);
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
};
