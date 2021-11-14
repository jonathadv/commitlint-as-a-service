const lint = require("@commitlint/lint").default;
const load = require("@commitlint/load").default;
const format = require("@commitlint/format").default;

const CONFIG = {
  extends: ["@commitlint/config-conventional"],
};

const loadOptions = async () => {
  return await load(CONFIG);
};

const formatReport = (report) => {
  return format({ results: [report] }, { color: true });
};

const runLint = async (commitMessage) => {
  const options = await loadOptions();

  report = await lint(commitMessage, options.rules, {
    parserOpts: options.parserPreset.parserOpts,
  });
  return report;
};

exports.getHomePage = async (req, res, next) => {
  res.set("location", "/static/");
  res.status(301).send();
};

exports.getJsonFormat = async (req, res, next) => {
  const commitMessage = req.query.msg || "";

  const report = await runLint(commitMessage);

  res.status(200).send(report);
};

exports.getTextFormat = async (req, res, next) => {
  const commitMessage = req.query.msg || "";

  const report = await runLint(commitMessage);
  const output = formatReport(report);

  res.set("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(output || "ok");
};
