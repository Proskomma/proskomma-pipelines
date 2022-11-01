# pipelineHandler

## Getting started

```
$ npm i pipeline-handler
```

**You can find working examples under `test` folder**

API of the `pipelineHandler` class :  
* pipelines : your custom pipelines
* transforms : your custom transforms to use
* proskomma : a proskomma instance (if needed)
* verbose : `true|false`

## Using official pipelines

This package contains many pipelines already. You can use them as shown in the examples.

### List of official pipelines

* `stripAlignmentPipeline` : 
  * description : strip alignment from a perf document
  * imputs :
    * `perf` : your aligned perf document
* `mergeAlignmentPipeline` :
  * description : merge alignment of a perf document
  * imputs :
    * `perf` : your previously stripped perf document
    * `strippedAlignment` : the report of `stripAlignmentPipeline`
* `perf2usfmPipeline` :
  * description : PERF => USFM
  * imputs :
    * `perf` : your perf document
* `usfm2perfPipeline` :
  * description : USFM => PERF
  * imputs :
    * `usfm` : your usfm document
    * `selectors` : the selectors (eg: `{"lang": "fra","abbr": "fraLSG"}` )

```js
const PipelineHandler = require("pipeline-handler");
const { Proskomma } = require("proskomma");

const pipelineH = new PipelineHandler({proskomma : new Proskomma()});

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