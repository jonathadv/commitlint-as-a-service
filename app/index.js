const logger = require("./logger").logger;
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const middlewares = require("./middlewares");

const PORT = process.env.PORT || 3333;

routes(app);

app.use(cors());
app.use(express.json());
app.use(middlewares.logging);
app.use("/", express.static(path.join(__dirname, "static")));
app.use(middlewares.errorHandler);
app.use(middlewares.notFoundHandler);

app.listen(PORT, () => {
  logger.info(`Server started listening to port ${PORT}`);
});
