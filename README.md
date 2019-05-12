# NiMS (Node --inspect Metadata Server)

This extension is helpful in cases where other applications (debuggers like Chrome DevTools) need access to Node's debug socket metadata but where VSCode is the owner of the Node.js process. This extension publishes the metadata provided by the Node binary via http://localhost:9229/json to http://localhost:6607.

## Installation
![Easy Install](https://june07.github.io/image/nimsVSCode.gif)
After installing NiMS open the command pallet `Cntr+Shift+P` and run NiMS.  You'll then see that it's listening on localhost:6607...

![NiMS listening](https://june07.github.io/image/screenCapture01.JPG)

## Features

As VSCode calls the Node.exe such that Node chooses a random debug port, sharing this information is needed as no other way exists to know upon which port the debugger has started listening.  This addition re-publishes said metadata by starting a local http instance and listening on a process independent port (tcp/6607).  The metadata gathered from Node's /json URL is updated as processes are created and destroyed.

* Multi Debug sessions are supported (ie Every active Node.js debugging session currently under VSCode control will be listed)
* Additional metadata is added by NiMS:
    * inspectSocket `"inspectSocket": "127.0.0.1:9963",`
    * nodeExeRunner `"nodeExeRunner": { "name": "vscode", "session": ... }`

Multiple Node debuggers running:
![](https://june07.github.io/image/screenCapture02Highlight.png)

Here is an example of this in use:
![nimsVSCode](https://user-images.githubusercontent.com/11353590/57107730-a3a01a00-6ce5-11e9-9e1e-df8570038f4f.gif)

## Known Issues
None

## Release Notes

### 0.0.1

Initial release of NiMS
