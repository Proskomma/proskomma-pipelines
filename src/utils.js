module.exports.saveFile = async function saveFile(file, rpath="./output.json") {
    try {
        if(typeof file === "string") {
            let thepath = rpath;
            await fse.outputFile(path.resolve(thepath), file);
        } else {
            await fse.outputJson(path.resolve(rpath), file);
        }
    } catch (err) {
        throw new Error("Failed to save the file", err);
    }
}