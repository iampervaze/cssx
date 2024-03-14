const { PurgeCSS } = require("purgecss");
const fs = require("fs").promises;
const path = require("path");
const { rimrafSync } = require("rimraf");
const transformer = require("./transformer/lit-ts");
const options = {
  content: ["demo/**/*.html"],
  css: ["demo/**/*.css"],
};
const purger = new PurgeCSS();

async function prepareOutputFolder(outputFolder, cleanOutputFolder) {
  const exists = async () =>
    await fs
      .access(outputFolder)
      .then(() => true)
      .catch(() => false);

  if (cleanOutputFolder && (await exists())) {
    rimrafSync(outputFolder);
  }

  if (!(await exists())) {
    await fs.mkdir(outputFolder, { recursive: true });
  }
}

async function bundleAndWriteCSS(
  results,
  outputFolder,
  bundleFileName,
  transformer
) {
  const ext = transformer?.extension || "css";
  let bundledCSS = results.map((r) => r.css).join("\n");
  bundledCSS = transformer?.transform(bundledCSS) || bundledCSS;
  const outputPath = path.join(outputFolder, `${bundleFileName}.${ext}`);
  await fs.writeFile(outputPath, bundledCSS);
}

async function writeIndividualCSSFiles(results, outputFolder, transformer) {
  const ext = transformer?.extension || "css";
  for (let result of results) {
    console.log(`Processing ${result.file}`);
    const fileName =
      path.basename(result.file, path.extname(result.file)) + `.${ext}`;
    const outputPath = path.join(outputFolder, fileName);
    const content = transformer?.transform(result.css) || result.css;
    await fs.writeFile(outputPath, content);
  }
}

async function purge(
  cleanOutputFolder,
  outputFolder,
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

    console.log("Purge completed successfully!");
  } catch (error) {
    console.error("An error occurred during the purge process:", error);
  }
}

// Example usage
purge(true, "./out", transformer, true);
