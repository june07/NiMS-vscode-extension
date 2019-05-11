"use strict";
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const http = require('http'), os = require('os'), HOST = '127.0.0.1', PORT = 6607;

class NodeInspectMetaServer {
    constructor() {
        let self = this;
        self.sessions = [];
        self.status;
        const socketStatusServer = http.createServer((req, res) => {
            let out = '', contentType = 'text/html';
            if (req.url === '/json') {
                contentType = 'application/json';
                out = JSON.stringify(self.sessions);
            }
            else {
                let json = JSON.stringify(self.sessions, null, '  ');
                out = `
          <html>
            <head>
              <title>Node.js --inspect Metadata Server</title>
            </head>
            <body>
                <pre style="word-wrap: break-word; white-space: pre-wrap;">${json}</pre>
            </body>
          </html>
        `;
            }
            res.writeHead(200, { 'Content-Type': contentType + '; charset=UTF-8' });
            res.end(out);
        });
        socketStatusServer.listen(PORT, HOST, () => {
            self.status = 'NiMS (Node --inspect Metadata Server) listening on ' + HOST + ':' + PORT;
            vscode_chrome_debug_core_1.logger.log('Node --inspect Metadata Server listening on ' + HOST + ':' + PORT);
        });
    }
    getSessionMeta(inspectPort) {
        return new Promise((resolve, reject) => {
            http.get('http://127.0.0.1:' + inspectPort + '/json', (res) => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];
                let error;
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                }
                else if (!/^application\/json/.test(contentType)) {
                    error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
                }
                if (error) {
                    vscode_chrome_debug_core_1.logger.error(error.message);
                    // consume response data to free up memory
                    res.resume();
                    return;
                }
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData[0]);
                    }
                    catch (e) {
                        reject(e.message);
                    }
                });
            }).on('error', (e) => {
                reject(`Got error: ${e.message}`);
            });
        });
    }
    getStatus() {
        return this.status;
    }
    getSocket() {
        return HOST + ':' + PORT;
    }
    getInspectPort(debuggerOutput) {
        //return launchArgs.find(arg => arg.includes('--inspect')).split('=')[1];
        return debuggerOutput.match(/(ws:\/\/)((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])):([0-9]+)/)[6];
    }
    addSession(args) {
        let self = this;
        let inspectPort = self.getInspectPort(args.debuggerOutput);
        self.getSessionMeta(inspectPort)
            .then((meta) => {
            Object.assign(meta, {
                inspectSocket: '127.0.0.1:' + inspectPort,
                nodeExeRunner: {
                    name: 'vscode',
                    session: args.session
                }
            });
            let index = self.sessions.findIndex(session => session.id === meta.id);
            if (index == -1)
                self.sessions.push(meta);
            else
                self.sessions[index] = meta;
        });
    }
    removeSession(index) {
        let self = this;
        self.sessions.splice(index, 1);
    }
}
let NiMS = new NodeInspectMetaServer();
module.exports = NiMS;

//# sourceMappingURL=nodeInspectMetadataServer.js.map
