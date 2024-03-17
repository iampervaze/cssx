#!/usr/bin/env node

const { program } = require("commander");
const { version } = require("./package.json");
const css = require("./css");
const { jsTransformer, tsTransformer } = require("./transformers");

program
  .version(version)
  .description(
    "Extract CSS for your Web Components from Design Systems or Libraries"
  );

program
  .command("css")
  .description("Extract CSS")
  .option("-b, --bundle <filename>", "Bundle all output", "all")
  .option("-c, --clean", "Clean/Remove output folder", true)
  .option("-o, --output <path>", "Output folder path", "./out")
  .option(
    "-t, --transform <transform>",
    "Output file transformer to use lit/lit-ts",
    ""
  )
  .action((options) => {
    const transformer =
      options.transform === "lit"
        ? jsTransformer
        : options.transform === "lit-ts"
        ? tsTransformer
        : null;
    css(
      options.clean,
      options.output,
      transformer,
      !!options.bundle,
      options.bundle
    );
  });

program.parse(process.argv);
