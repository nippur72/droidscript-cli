# droidscript-cli

Command line tool for running [DroidScript](http://droidscript.org/) programs on the phone without the DroidScript IDE.

## Install

```
$ npm i -g droidscript-cli
```

## Examples

Checks the connection with DroidScript:
```
$ dro -h 192.168.8.7:8088 -i
```

Runs the "hello" program:
```
$ dro -h 192.168.8.7:8088 -p hello -r
```

Debugs the (last executed) program:
```
$ dro -h 192.168.8.7:8088 -r -d
```

Stops the running program:
```
$ dro -h 192.168.8.7:8088 -s
```

Runs the program usingthe environment variable
```
$ set DROIDSCRIPT_HOST=192.168.8.7:8088
$ dro -r
```

# License

MIT

