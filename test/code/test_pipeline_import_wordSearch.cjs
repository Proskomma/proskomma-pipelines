const { PipelineHandler } = require("../../dist/main");
const { Validator } = require("proskomma-json-tools");
const test = require("tape");
const { Proskomma } = require("proskomma");
const fse = require("fs-extra");
const path = require("path");
const pipelines = require("../data/pipelines");
const transforms = require("../data/transforms");

const testGroup = 'wordSearch';

const pipelineH = new PipelineHandler({
    pipelines: pipelines,
    transforms: transforms,
    proskomma:new Proskomma(),
    verbose:false
});

const validator = new Validator();

const usfmContent = fse.readFileSync(path.resolve(__dirname, "../data/usfms/titus.usfm")).toString();

test(`returns output with valid args (${testGroup})`, async (t) => {
    t.plan(1);
    try {
        let output = await pipelineH.runPipeline("wordSearch", {
            usfm: usfmContent,
            selectors: {"lang": "fra", "abbr": "ust"}
        });

        const validatorResult = validator.validate('constraint','perfDocument','0.2.1', output.perf);
        if (!validatorResult.isValid) {
            t.fail("usfm=>perf throws on valid usfm");
            throw `usfm=>perf, PERF file is not valid. \n${JSON.stringify(validatorResult,null,2)}`;
        } else {
            t.ok(validatorResult.isValid);
        }

        // await saveFile(JSON.stringify(output.perf, null, 2));
    } catch (err) {
        console.log(err);
        t.fail("usfm2perfPipeline throws on valid perf");
    }
});