const { PipelineHandler } = require("../../dist/main");
const { Proskomma } = require("proskomma");
const fse = require("fs-extra");
const path = require("path");
const test = require("tape");

const testGroup = "strip and merge";

const pipelineH = new PipelineHandler({ proskomma: new Proskomma(), verbose: false });

const perfContent = fse.readFileSync(path.resolve(__dirname, "../data/perfs/titus_aligned_eng.json")).toString();


let reportStrip = null;
let outputStrip = null;
let output = null;

test(`strip alignment (${testGroup})`, async (t) => {
    t.plan(2);
    try {
        output = await pipelineH.runPipeline("stripAlignmentPipeline", {
            perf: JSON.parse(perfContent),
        });
        // console.log(JSON.stringify(output.perf, "  ", 4));
        outputStrip = output.perf;
        reportStrip = output.strippedAlignment;
        t.ok(outputStrip, "perf alignment stripped");
        t.ok(reportStrip, "perf report alignement");
        // await saveFile(JSON.stringify(output.perf, null, 2), "test/outputs/STRIP_perf_titus_stripped_eng.json");
        // await saveFile(JSON.stringify(output.strippedAlignment, null, 2), "test/outputs/STRIP_strippedAlignment_stripped_eng.json");    
    } catch (err) {
        console.log(err);
        t.fail("stripAlignmentPipeline throws on valid perf");
    }
});

test(`merge alignment (${testGroup})`, async (t) => {
    t.plan(2);
    try {
        output = await pipelineH.runPipeline("mergeAlignmentPipeline", {
            perf: outputStrip,
            strippedAlignment: reportStrip,
        });
        t.ok(output, "perf alignment stripped");
        // console.log(JSON.stringify(perfContent, " ", 4));
        t.same(output.perf, JSON.parse(perfContent));
        // await saveFile(JSON.stringify(output.perf, null, 2), "test/outputs/STRIP_perf_titus_merged_align_eng.json");
    } catch (err) {
        console.log(err);
        t.fail("mergeAlignmentPipeline throws on valid perf");
    }
});