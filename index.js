#!/usr/bin/env node

const { program } = require('commander');

program
  .version('0.1.0')
  .description('An example CLI tool');

// Define your commands here
program
  .command('greet <name>')
  .description('Greet someone')
  .option('--morning', 'Say good morning')
  .action((name, options) => {
    const greeting = options.morning ? 'Good morning' : 'Hello';
    console.log(`${greeting}, ${name}!`);
  });


program.parse(process.argv);
