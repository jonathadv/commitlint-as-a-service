const lint = require('@commitlint/lint').default;
const load = require('@commitlint/load').default;
const format = require('@commitlint/format').default;

const CONFIG = {
    extends: ['@commitlint/config-conventional'],
};


const loadOptions = async () => {
    return await load(CONFIG)
}

const formatReport = (report) => {
    return format({results: [report]}, {color: true})
}

const runLint = async (commitMessage) => {
    const options = await loadOptions()
    
    report = await lint(commitMessage, options.rules, {parserOpts: options.parserPreset.parserOpts})
    return report
};


exports.post = (req, res, next) => {    
    res.status(201).send('Rota POST!');
};

exports.getJson = async (req, res, next) => {    
    let commitMessage = req.query.msg || ""
    const report = await runLint(commitMessage)
    res.status(200).send(report);
};

exports.getTxt = async (req, res, next) => {    
    let commitMessage = req.query.msg || ""

    const report = await runLint(commitMessage)
    const output = formatReport(report)

    res.status(200).send(output);
};