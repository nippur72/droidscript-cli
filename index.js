"use strict";
/*
 * Based on the work of Dave Smart, https://plus.google.com/u/0/102457040597863456686
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var node_fetch_1 = require("node-fetch");
var options_1 = require("./options");
var ws;
var base = "192.168.0.7:8088";
function cmd(args) {
    return __awaiter(this, void 0, void 0, function () {
        var packed, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    packed = Object.keys(args).map(function (key) { return key + "=" + encodeURIComponent("" + args[key]); }).join("&");
                    url = "http://" + base + "/ide?" + packed;
                    return [4 /*yield*/, node_fetch_1.default(url)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.text()];
            }
        });
    });
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
function runProgram(prog) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cmd({ cmd: "run", prog: prog })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// stop the currently running program
function stopProgram() {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, cmd({ cmd: "stop" })];
                case 1:
                    response = _b.apply(_a, [_c.sent()]);
                    console.log("stopped");
                    return [2 /*return*/];
            }
        });
    });
}
// get useful info from phone.
function GetInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, cmd({ cmd: "getinfo" })];
                case 1:
                    response = _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/, response];
            }
        });
    });
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
    ws = new WebSocket("ws://" + base, {
        perMessageDeflate: false
    });
    ws.on("open", function () {
        ws.send("debug", function (err) {
            if (!err) {
                console.log("debugger connected");
            }
            else {
                console.log("can't connect");
            }
        });
    });
    ws.on("message", function (data) {
        console.log(data);
    });
    ws.on("close", function () {
        console.log("debugger disconnected");
    });
    ws.on("error", function (e) {
        console.error(e);
    });
}
main(process.argv);
function main(argv) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var options, noRequiredOptions, env, info_1, err_1, programName, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        options = options_1.opts(argv);
                    }
                    catch (ex) {
                        console.log(ex.message);
                        return [2 /*return*/, -1];
                    }
                    noRequiredOptions = (options.run === undefined &&
                        options.debug === undefined &&
                        options.info === undefined &&
                        options.stop === undefined);
                    if (options.help || noRequiredOptions) {
                        console.log(argv.length);
                        console.log(options_1.generateHelp());
                        process.exit(0);
                    }
                    if (options.host) {
                        base = options.host;
                    }
                    else {
                        env = process.env["DROIDSCRIPT_HOST"];
                        if (env !== undefined) {
                            base = env;
                        }
                        else {
                            console.log("Specify the host address with --host or with the DROIDSCRIPT_HOST environment variable.");
                            process.exit(0);
                        }
                    }
                    if (!options.info) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, GetInfo()];
                case 2:
                    info_1 = _a.sent();
                    console.log("DroidScript OK!");
                    Object.keys(info_1).forEach(function (k) {
                        console.log(k + ": " + info_1[k]);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Can't connect to DroidScript at " + base + ":");
                    if (err_1.code === "ECONNREFUSED") {
                        err_1 = "Connection refused.";
                    }
                    console.error(err_1);
                    process.exit(0);
                    return [3 /*break*/, 4];
                case 4:
                    if (options.debug) {
                        StartDebug();
                    }
                    if (!(options.run !== undefined)) return [3 /*break*/, 9];
                    programName = void 0;
                    if (!(options.program !== undefined)) return [3 /*break*/, 5];
                    programName = options.program;
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, GetInfo()];
                case 6:
                    info = _a.sent();
                    programName = info.lastprog;
                    _a.label = 7;
                case 7: return [4 /*yield*/, runProgram(programName)];
                case 8:
                    _a.sent();
                    if (!options.debug) {
                        process.exit(0);
                    }
                    else {
                        process.stdin.setRawMode(true);
                        process.stdin.resume();
                        process.stdin.on('data', function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, stopProgram()];
                                    case 1:
                                        _a.sent();
                                        process.exit(0);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    _a.label = 9;
                case 9:
                    if (!options.stop) return [3 /*break*/, 11];
                    return [4 /*yield*/, stopProgram()];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    });
}
