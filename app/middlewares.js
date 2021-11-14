const logger = require("./logger").logger;
const BAD_REQUEST_MESSAGE = {
  message: "missing '?msg=<commit message>' in request query string",
};

exports.logging = (req, res, next) => {
  logger.info(`${req.method} ${req.url} -`, {
    msg: req.query.msg,
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
