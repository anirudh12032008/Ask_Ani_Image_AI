const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const Tesseract = require('tesseract.js');

const server = express();
const upload = multer().single('image');

// Add body-parser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/api/ocr', upload, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded!' });
        }

        const { buffer } = req.file;
        await Tesseract.load();
        const { data: { text } } = await Tesseract.recognize(buffer);



        res.status(200).json({ text });
    } catch (error) {
        console.error('Image OCR error:', error);
        res.status(500).json({ error: 'Image OCR error' });
    }
});

module.exports = server;
