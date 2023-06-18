// index.js
const express = require('express');
const next = require('next');
const axios = require('axios');
const multer = require('multer');
// const { createWorker } = require('tesseract.js');
const bodyParser = require('body-parser');

const serverless = require('serverless-http');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const gptHandler = require('./pages/api/gpt');
const ocrHandler = require('./api/ocr');

const server = express();

// Add body-parser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const Tesseract = require('tesseract.js');

const upload = multer().single('image');
server.post('/api/gpt', gptHandler);
server.post('/api/ocr', ocrHandler);


app.prepare().then(() => {
    server.all('*', (req, res) => {
        return handle(req, res);
    });



    const port = process.env.PORT || 3001;
    const serverInstance = server.listen(port, (err) => {
        if (err) {
            console.error('Error starting server:', err);
        } else {
            console.log(`> Ready on http://localhost:${port}`);
        }
    });

    const serverlessHandler = serverless(server);

    module.exports = {
        server,
        serverlessHandler,
    };
});

// module.exports = server;

// export default index;