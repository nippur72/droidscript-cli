
import optionator = require("optionator");

let pkg = require("./package.json");

let optsConfig = {
   prepend: [`${pkg.name}  v${pkg.version}`,
             `${pkg.description}`,
             `Usage:`,
             `dro [-h host] [-r [program]] [-d] [-s] [-i] [-?]`].join("\n"),

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
      /*{ heading: 'Options' }, 
      /*{ option: 'help', alias: 'h', type: 'Boolean', description: 'Show help.' }, */
      /*{ option: 'watch', alias: 'w', type: 'Boolean', default: 'false', description: 'Starts jsx-templates in watch mode.' }, */
      /*{ option: 'typescript', type: 'Boolean', default: 'false', required: false, description: 'Output typescript (.tsx) files.'},
      { option: 'debug-runtime-check', type: 'Boolean', default: 'false', required: false, description: 'Check expressions at runtime and debug to console.'},
      { option: 'debug-runtime-print-function', type: 'String', default: 'console.error', required: false, description: 'JavaScript function used to log runtime-checks messages.'},
      { option: 'normalize-html-whitespace', type: 'Boolean', default: 'true', required: false, description: 'Remove repeating whitespace from HTML text.'},
      { option: 'brackets', type: 'String', default: '{ }', required: false, description: 'Characters used to delimit template expressions (separated by a space).'},*/

      /*
      { option: 'trace', alias: 't', type: 'Boolean', default: 'false', required: false, description: 'Catches all runtime errors and logs them to the console.'},
      //{ option: 'new', alias: 'n', type: 'Boolean', required: false, description: 'Use new emit engine (do not rely on react-templates).'},

      { option: 'use-rioct-runtime', type: 'Boolean', default: 'false', required: false, description: 'uses "rioct" runtime for extra features'},
      
      { option: 'check-undefined', type: 'Boolean', default: 'false', required: false, description: "Report an error if an expression is 'undefined'."},      
      
      { option: 'create-element-alias', type: 'String', required: false, description: 'Use an alias for "React.createElement()".'},
      { option: 'target-version', type: 'String', default: '15.0.0', description: 'React version to generate code for.' },
      { option: 'react-import-path', type: 'String', default: 'react', description: 'Dependency path for importing React.' },
      { option: 'lodash-import-path', type: 'String', default: 'lodash', description: 'Dependency path for importing lodash.' },
      { option: 'external-helpers', default: '', type: 'String', description: "Emit helper functions as external dependency (and do not rely on 'lodash')" }            
      */
   ]
};

export const opts = (args: string[]) => optionator(optsConfig).parseArgv(args);

export const generateHelp = () => optionator(optsConfig).generateHelp();

export interface CommandLineOptions {
   help: boolean;
   host: string;
   info: boolean;
   debug: boolean;
   run: boolean;
   program: string;
   stop: boolean;
}

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
