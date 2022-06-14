// https://github.com/Thoud/zero-dependency-web-server/blob/main/index.js
// https://github.com/felixge/node-paperboy/blob/master/lib/paperboy.js

import http from 'http';
import fs from 'fs';
import esbuild from 'esbuild';
import chokidar from 'chokidar';

function generateBundle() {
  return esbuild.build({
    entryPoints: ['./src/index.jsx'],
    bundle: true,
    outfile: 'public/index.js',
  })
    .then(() => console.log('esbuild finished'))
    .catch(() => process.exit(1))
}

function generateHttpServer() {
  const serverHandler = (req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
      fs.readFile('./public/index.html', (error, data) => {
        // Throwing an error if one comes up
        if (error) throw error;
        // Serving the data to the client
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      });
    }

    else if (req.url === '/index.js') {
      fs.readFile('./public/index.js', (error, data) => {
        if (error) throw error;
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(data);
        res.end();
      });
    }

    else {
      res.writeHead(404);
      res.end();
    }
  }

  return http
    .createServer(serverHandler)
    .listen(3000, () => console.log('Web Server listening on port 3000...'));
}

function watchChanges() {
  chokidar.watch('./src', {ignoreInitial: true}).on('all', (event, path) => {
    console.log(event, path);
    generateBundle();
  });
}

function main() {
  generateBundle();
  generateHttpServer();
  watchChanges();
}

main();
