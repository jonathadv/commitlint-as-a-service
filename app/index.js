const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

routes(app);

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));
app.listen(process.env.PORT || 3333);
