"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var optionator = require("optionator");
var pkg = require("./package.json");
var optsConfig = {
    prepend: [pkg.name + "  v" + pkg.version,
        "" + pkg.description,
        "Usage:",
        "dro [-h host] [-r [program]] [-d] [-s] [-i] [-?]"].join("\n"),
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true,
    options: [
        { option: "help", alias: "?", type: "Boolean", required: false, description: "Show help." },
        { option: "host", alias: "h", type: "String", required: false, description: "Specify the DroidScript host address (host:port). If omitted, the DROIDSCRIPT_HOST environment variable will be used." },
        { option: "info", alias: "i", type: "Boolean", required: false, description: "Check the connection with DroidScript." },
        { option: "debug", alias: "d", type: "Boolean", required: false, description: "Debug the running program." },
        { option: "run", alias: "r", type: "Boolean", required: false, description: "Run the program on DroidScript." },
        { option: "program", alias: "p", type: "String", required: false, description: "Specify the program to run. If omitted, the last executed program will be used." },
        { option: "stop", alias: "s", type: "Boolean", required: false, description: "Stop the current running program." },
    ]
};
exports.opts = function (args) { return optionator(optsConfig).parseArgv(args); };
exports.generateHelp = function () { return optionator(optsConfig).generateHelp(); };
/*
export function defaultOptions(): CommandLineOptions {
   return {
      help: false;
      host: "",
      info: false,
      debug: false,
      run: "",
      stop: false,
      
      _: [],
      watch: false,
      typescript: false,
      debugRuntimeCheck: false,
      debugRuntimePrintFunction: "console.error",
      normalizeHtmlWhitespace: true,
      brackets: "{{ }}",
      

      
      trace: false,
      
      
      useRioctRuntime: false,
      
      checkUndefined: false,
      createElementAlias: '',
      targetVersion: '15.0.0',
      reactImportPath: 'react',
      lodashImportPath: 'lodash',
      externalHelpers: ''
      
   };
}
*/
