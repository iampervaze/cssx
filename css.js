const { PurgeCSS } = require("purgecss");
const fs = require("fs").promises;
const path = require("path");
const { rimrafSync } = require("rimraf");
const transformer = require("./transformers/lit-ts");

const options = {
  content: ["**/*.html"],
  css: ["**/*.css"],
  skippedContentGlobs: ['node_modules/**', 'out/**']
};
const purger = new PurgeCSS();

async function prepareOutputFolder(outputFolder, cleanOutputFolder) {
  const folderExists = async () =>
    await fs
      .access(outputFolder)
      .then(() => true)
      .catch(() => false);

  if (cleanOutputFolder && (await folderExists())) {
    rimrafSync(outputFolder);
  }

  if (!(await folderExists())) {
    await fs.mkdir(outputFolder, { recursive: true });
  }
}

async function bundleAndWriteCSS(
  results,
  outputFolder,
  bundleFileName,
  transformer
) {
  let bundledCSS = results.map((r) => r.css).join("\n");
  bundledCSS = transformer?.transform(bundledCSS) || bundledCSS;
  const ext = transformer?.extension || "css";
  const outputPath = path.join(outputFolder, `${bundleFileName}.${ext}`);
  await fs.writeFile(outputPath, bundledCSS);
}

async function writeIndividualCSSFiles(results, outputFolder, transformer) {
  for (let result of results) {
    console.log(`Processing ${result.file}`);
    let content = transformer?.transform(result.css) || result.css;
    const ext = transformer?.extension || "css";
    const fileName =
      path.basename(result.file, path.extname(result.file)) + `.${ext}`;
    const outputPath = path.join(outputFolder, fileName);
    await fs.writeFile(outputPath, content);
  }
}

async function purge(
  cleanOutputFolder = true,
  outputFolder = "./out",
  transformer = null,
  bundle = false,
  bundleFileName = "all"
) {
  try {
    const results = await purger.purge(options);

    if (!results.length) {
      console.log("No files to purge.");
      return;
    }

    await prepareOutputFolder(outputFolder, cleanOutputFolder);

    if (bundle) {
      await bundleAndWriteCSS(
        results,
        outputFolder,
        bundleFileName,
        transformer
      );
    } else {
      await writeIndividualCSSFiles(results, outputFolder, transformer);
    }

    console.log("Done!");
  } catch (error) {
    console.error("An error occurred during the purge process:", error);
  }
}

// Example usage
//purge();
//purge(true, "./out", transformer, true);

module.exports = purge;
