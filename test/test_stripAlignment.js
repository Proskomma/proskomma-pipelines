const PipelineHandler = require("../dist/main");
const { Proskomma } = require("proskomma");
const fse = require("fs-extra");
const path = require("path");

const pipelineH = new PipelineHandler({proskomma:new Proskomma(), verbose:true});

const perfContent = fse.readFileSync(path.resolve(__dirname, "../data/usfms/titus_aligned_eng.json")).toString();

async function saveFile(file, rpath="./output.json") {
    try {
        if(typeof file === "string") {
            let thepath = rpath;
            await fse.outputFile(path.resolve(thepath), file);
        } else {
            await fse.outputJson(path.resolve(rpath), file);
        }
    } catch (err) {
        throw new Error("Failed to save the file", err)
    }
}

async function test() {
    let output = await pipelineH.runPipeline("stripAlignmentPipeline", {
        perf: JSON.parse(perfContent)
    });
    await saveFile(JSON.stringify(output.perf, null, 2), "test/outputs/STRIP_perf_titus_stripped_eng.json");
    await saveFile(JSON.stringify(output.strippedAlignment, null, 2), "test/outputs/STRIP_strippedAlignment_stripped_eng.json");
}

test();