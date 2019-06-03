# NiMS (Node --inspect Metadata Server)

This extension is helpful in cases where other applications (debuggers like Chrome DevTools) need access to Node's debug socket metadata but where VSCode is the owner of the Node.js process. This extension publishes the metadata provided by the Node binary via http://localhost:9229/json to http://localhost:6607.

## Installation
[![Easy Install](https://res.cloudinary.com/june07/image/upload/c_scale,w_500/v1559330540/brakecode/nimsVSCode_jstbf7.gif)](https://june07.github.io/image/nimsVSCode.gif)

After installing NiMS open the command pallet `Cntr+Shift+P` and run NiMS.  You'll then see that it's listening on localhost:6607...

![NiMS listening](https://june07.github.io/image/screenCapture01.JPG)

## Features

As VSCode calls the Node.exe such that Node chooses a random debug port, sharing this information is needed as no other way exists to know upon which port the debugger has started listening.  This addition re-publishes said metadata by starting a local http instance and listening on a process independent port (tcp/6607).  The metadata gathered from Node's /json URL is updated as processes are created and destroyed.

* Multi Debug sessions are supported (ie Every active Node.js debugging session currently under VSCode control will be listed)
* Additional metadata is added by NiMS:
    * inspectSocket `"inspectSocket": "127.0.0.1:9963",`
    * nodeExeRunner `"nodeExeRunner": { "name": "vscode", "session": ... }`
* Tunnel local debug connections for easy sharing (click the image to see better):

    [![NiMS VSCode debug toolbar icon](https://res.cloudinary.com/june07/image/upload/c_scale,q_auto:best,w_500/v1559570636/brakecode/screenCapture04.jpg)](https://res.cloudinary.com/june07/image/upload/v1559570636/brakecode/screenCapture04.jpg)

    [![Generated global chrome-devtools url](https://res.cloudinary.com/june07/image/upload/c_scale,q_auto:best,w_500/v1559570631/brakecode/screenCapture03.jpg)](https://res.cloudinary.com/june07/image/upload/v1559570631/brakecode/screenCapture03.jpg)
    
    [![Example gif of tunneling](https://res.cloudinary.com/june07/image/upload/c_scale,q_auto:best,w_500/v1559333794/brakecode/pE3O8Fu.gif)](https://i.imgur.com/pE3O8Fu.gif)

Multiple Node debuggers running:
[![](https://res.cloudinary.com/june07/image/upload/c_scale,w_500/v1559331039/brakecode/screenCapture02Highlight.png)](https://june07.github.io/image/screenCapture02Highlight.png)

Here is an example of this in use:
[![nimsVSCode](https://user-images.githubusercontent.com/11353590/57107730-a3a01a00-6ce5-11e9-9e1e-df8570038f4f.gif)](https://user-images.githubusercontent.com/11353590/57107730-a3a01a00-6ce5-11e9-9e1e-df8570038f4f.gif)

## Known Issues
None

---
## CHANGELOG

### [0.1.0] - 2019-05-31
#### Added
- Tunnels to share local debug sessions easily.

### [0.0.6] - 2019-05-10
#### Added
- Add debug activation event so manually starting is not needed.

### [0.0.1] - 2019-05-10
#### Added
- Initial release