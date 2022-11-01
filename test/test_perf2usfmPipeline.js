const PipelineHandler = require("../dist/main");
const { Proskomma } = require("proskomma");
const fse = require("fs-extra");
const path = require("path");

const pipelineH = new PipelineHandler({proskomma:new Proskomma(), verbose:true});

const perfContent = fse.readJsonSync(path.resolve(__dirname, "../data/usfms/titus_aligned_eng.json"));

async function saveFile(file, rpath="./output_perf.usfm") {
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
    let output = await pipelineH.runPipeline("perf2usfmPipeline", {
        perf: perfContent
    });
    await saveFile(output.usfm);
}

test();