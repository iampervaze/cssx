#!/usr/bin/env node

const { program } = require("commander");
const { version } = require("./package.json");

program.version(version).description("An example CLI tool");

// Define your commands here
program
  .command("css")
  .description("Extract CSS")
  .option("-b, --bundle <filename>", "Bundle all output", "all")
  .action((options) => {
    console.log(options);
    console.log(`CSS bundle:{${options.bundle}}`);
  });

program.parse(process.argv);
