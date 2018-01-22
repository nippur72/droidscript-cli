/*
 * Based on the work of Dave Smart, https://plus.google.com/u/0/102457040597863456686
 *
 */

import WebSocket = require("ws");
import path = require("path");
import fetch from "node-fetch";

import { opts, CommandLineOptions, generateHelp } from "./options";

let ws: WebSocket;

let base = "192.168.0.7:8088";

interface Info {
   status: string;
   lastprog: string;
   appname: string;
   usepass: boolean;
   devicename: string;
   macaddress: string;
   premium: boolean;
   language: string;
}

async function cmd(args: {[key: string]:string|number}) {
   const packed = Object.keys(args).map(key=>`${key}=${encodeURIComponent(`${args[key]}`)}`).join("&");
   const url = `http://${base}/ide?${packed}`;   
   const response = await fetch(url);
   return response.text();
}

/*
test();
async function test() {
   console.log(await GetInfo());
   console.log(await stopProgram());
   console.log(await runProgram("gps-droid-firebase"));
   StartDebug();
}
*/

// run the specified program
async function runProgram(prog: string) {   
   const response = await cmd({ cmd: "run", prog: prog });   
   return;
}

// stop the currently running program
async function stopProgram() {
   const response = JSON.parse(await cmd({ cmd: "stop" }));
   console.log("stopped");
   return;
}

// get useful info from phone.
async function GetInfo() {
   const response = JSON.parse(await cmd({cmd: "getinfo"})) as Info;
   return response;
}

/*
//Add a new program to IDE.
function AddProgram( type )
{
	//Get program title from text box.
	var name = txtAdd.value;

	//Send 'Add' command to phone.
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onload = function() { alert(xmlHttp.responseText); };
	if( type=="html" ) xmlHttp.open( "get", "http://192.168.1.121:8088/ide?cmd=add&prog="+name+"&type=html", true );
	else xmlHttp.open( "get", "http://192.168.1.121:8088/ide?cmd=add&prog="+name, true );
	xmlHttp.send();
}

//Rename a file (or folder).
//eg. img/mypic.png -> img/mypic2.png
//eg. myprog.js -> myprog2.js
function RenameFile()
{
	//Get old and new name from text box.
	var file = txtOld.value;
	var newname = txtNew.value;

	//Send 'Rename' command to phone.
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onload = function() { alert(xmlHttp.responseText); };
	xmlHttp.open( "get", "http://192.168.1.121:8088/ide?cmd=rename&file="+file+"&newname="+newname, true );
	xmlHttp.send();
}

//Delete a file.
//eg. img/mypic.png
//Note: '..' in file name is not allowed!
function DeleteFile()
{
	//Get name from text box.
	var file = txtFile.value;

	//Send 'Delete' command to phone.
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onload = function() { alert(xmlHttp.responseText); };
	xmlHttp.open( "get", "http://192.168.1.121:8088/ide?cmd=delete&file="+file, true );
	xmlHttp.send();
}

//List asset files in given subfolder.
function ListFiles( subdir )
{
	xmlHttp = new XMLHttpRequest();
	//if( subdir=="img" ) xmlHttp.onload = ShowFiles;
	//else
	xmlHttp.onload = function() { alert( xmlHttp.responseText ); }
	xmlHttp.open( "get", "http://192.168.1.121:8088/ide?cmd=list&dir=" + subdir, true );
	xmlHttp.send();
}

//Show listed files in browser.
function ShowFiles()
{
	var html = "";
	var files = JSON.parse(xmlHttp.responseText).list; 
	//alert( files );
	for( i=0; i<files.length; i++ )
	{
		html += "<img width=64 src=\"http://192.168.1.121:8088/img/"+files[i]+"\">";
	}
	divImg.innerHTML = html;
}

//Get a file/asset from phone.
//(Only assets or paths below /sdcard/AndroidScript/ are allowed)
function GetFile( file )
{
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onload = function() { alert( JSON.parse(xmlHttp.responseText).file ); };
	xmlHttp.open( "get", "http://192.168.1.121:8088/ide?cmd=get&file="+file, true );
	xmlHttp.send();
}

//Get a list of all samples.
function GetSamples()
{
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onload = function() { alert( xmlHttp.responseText ); };
	xmlHttp.open( "get", "http://192.168.1.121:8088/ide?cmd=getsamples", true );
	xmlHttp.send();
}
*/

// connect to debug output via web sockets.
function StartDebug() {
   ws = new WebSocket(`ws://${base}`, {
      perMessageDeflate: false
   });

   ws.on("open", () => {
      ws.send("debug", err => {
         if(!err) {
				console.log("debugger connected");
			} else {
				console.log("can't connect");
			}
      });
   });
	ws.on("message", data => {
      console.log(data);
   });
	ws.on("close", () => {
      console.log("debugger disconnected");
   });
	ws.on("error", e => {
      console.error(e);
   });
}

main(process.argv);

async function main(argv: string[]) {
	let options: CommandLineOptions;

   try {
      options = opts(argv);
   } catch(ex) {
      console.log(ex.message);
      return -1;
	}

	const noRequiredOptions = (
		options.run === undefined &&
		options.debug === undefined &&
		options.info === undefined &&
		options.stop === undefined
	);

	if(options.help || noRequiredOptions) {
		console.log(argv.length);
		console.log(generateHelp());
		process.exit(0);
	}

	if(options.host) {
		base = options.host;
	} else {
		const env = process.env["DROIDSCRIPT_HOST"];
		if(env !== undefined) {
			base = env;
		} else {
			console.log("Specify the host address with --host or with the DROIDSCRIPT_HOST environment variable.");
			process.exit(0);
		}
	}

	if(options.info) {
		try {
         const info = await GetInfo();		
         console.log("DroidScript OK!");
         Object.keys(info).forEach(k => {
            console.log(`${k}: ${(info as any)[k]}`);
         })                  
			//process.exit(0);
		} catch(err) {
			console.error(`Can't connect to DroidScript at ${base}:`);
			if(err.code === "ECONNREFUSED") {
				err = "Connection refused.";
			}
			console.error(err);
			process.exit(0);
		}
	}

	if(options.debug) {
		StartDebug();
	}

	if(options.run !== undefined) {
      let programName: string;
      if(options.program !== undefined) {
         programName = options.program;
      } else {
         const info = await GetInfo();
         programName = info.lastprog;
      }

      await runProgram(programName);
		if(!options.debug) {
			process.exit(0);
      } else {
         process.stdin.setRawMode!(true);
         process.stdin.resume();
         process.stdin.on('data', async ()=>{
            await stopProgram();
            process.exit(0);
         });         
      }
	}

	if(options.stop) {
		await stopProgram();
	}
}
