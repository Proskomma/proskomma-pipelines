const { PipelineHandler } = require("../../dist/main");
const { Validator } = require("proskomma-json-tools");
const test = require("tape");
const { Proskomma } = require("proskomma");
const fse = require("fs-extra");
const path = require("path");

const testGroup = "Just the bible";

const pipelineH = new PipelineHandler({proskomma:new Proskomma(), verbose:false});

const perfContent = fse.readJsonSync(path.resolve(__dirname, "../data/usfms/titus_aligned_eng.json"));

const validator = new Validator();

test(`Validate the output perf (${testGroup})`, async (t) => {
    t.plan(1);
    try {
        let output = await pipelineH.runPipeline("justTheBiblePipeline", {
            perf: perfContent
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
        t.fail("perf2usfmPipeline throws on valid perf");
    }
});