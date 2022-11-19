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

const perfContent = fse.readJsonSync(path.resolve(__dirname, "../data/usfms/titus_aligned_eng.json"));

test(`returns output with valid args (${testGroup})`, (t) => {
    t.plan(1);
    try {
        t.doesNotThrow(async () => {
            let output = await pipelineH.runPipeline("wordSearchPipeline", {
                perf: perfContent,
                searchString: "Zacharias",
                "ignoreCase": "1",
                "asRegex": "0",
                "logic": "A",
                "asPartial": "0"
            });

            t.ok('matches' in output);
            t.ok('searchTerms' in output.matches);
            t.equal(output.matches.matches[0].chapter, '1');
            t.equal(output.matches.matches[0].verses, '5');
            // await saveFile(output.usfm);
        })
    } catch (err) {
        console.log(err);
        t.fail("perf2usfmPipeline throws on valid perf");
    }
});