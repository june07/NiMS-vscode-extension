# NiMS (Node --inspect Metadata Server)

This extension is helpful in cases where other applications (debuggers like Chrome DevTools) need access to Node's debug socket metadata but where VSCode is the owner of the Node.js process. This extension publishes the metadata provided by the Node binary via http://localhost:9229/json to http://localhost:6607.

## Features

As VSCode calls the Node.exe such that Node chooses a random debug port, sharing this information is needed as no other way exists to know upon which port the debugger has started listening.  This addition re-publishes said metadata by starting a local http instance and listening on a process independent port (tcp/6607).  The metadata gathered from Node's /json URL is updated as processes are created and destroyed.

Here is an example of this in use:
![nimsVSCode](https://user-images.githubusercontent.com/11353590/57107730-a3a01a00-6ce5-11e9-9e1e-df8570038f4f.gif)

## Known Issues
None

## Release Notes

### 1.0.0

Initial release of NiMS

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
