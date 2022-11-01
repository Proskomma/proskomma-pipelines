# pipelineHandler

## Getting started

```
$ npm i pipeline-handler
```
```js
const PipelineHandler = require("pipeline-handler");
const { Proskomma } = require("proskomma");
const transforms = require("./data/transforms/");
const pipelines = require("./data/pipelines/");

const pipelineH = new PipelineHandler(new Proskomma(), pipelines, transforms);

async function test() {
    let output = await pipelineH.runPipeline("YOUR_PIPELINE_NAME", {
        ...YOUR_INPUTS
    });
    
    // do some stuff with the output ...
}

test();

```

## Development
```
$ npm i
$ npm run build
$ npm run test
```

This will create a perf file `output.json`.

## example

See the [`test/test_usfm2perf_pipeline.js`](test/test_usfm2perf_pipeline.js) file for an example of a running code.