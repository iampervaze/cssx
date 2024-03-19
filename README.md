
# @dellteam/cssx

## Description:
@dellteam/cssx is a command line tool that helps developers extract the necessary CSS rules from large design system CSS files that are relevant to their HTML files or components.

## Installation:
```bash
npm install -g @dellteam/cssx
```

### Usage:
```
cssx css [options]

 -b, --bundle <filename>      Bundle all output in a single file (default: "all")
  -c, --clean                  Clean/Remove output folder (default: true)
  -o, --output <path>          Output folder path (default: "./out")
  -t, --transform <transform>  Output file transformer to use lit/lit-ts (default: "")
  -h, --help                   display help for command
```
## Demo Usage:
- Install the package @dellteam/cssx
- Clone this repository
- Change directory to demo folder and
- Run `cssx css -c -b all` on your command prompt
- Done!
  
Your output file `all.css` containing applicable css will be available in `demo/out` folder

## License:
This tool is released under the MIT license.
Feel free to copy and paste this Markdown content into your README.md file for your Node.js command line tool, @dellteam/cssx.