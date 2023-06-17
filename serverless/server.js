// const express = require('express');
// const next = require('next');
// const axios = require('axios');
// const multer = require('multer');
// const { createWorker } = require('tesseract.js');
// const bodyParser = require('body-parser');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const server = express();
// // const upload = multer().single('image');
// // const upload = multer({ dest: 'uploads/' });





// // Add body-parser middleware
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));


// const Tesseract = require('tesseract.js');


// const upload = multer().single('image');
// server.post('/api/ocr', upload, async (req, res) => {
//     try {
//         console.log('ocr');
//         const { buffer } = req.file;
//         const { data: { text } } = await Tesseract.recognize(buffer);
//         console.log(text)

//         res.status(200).json({ text });
//     } catch (error) {
//         console.error('Image OCR error:', error);
//         res.status(500).json({ error: 'Image OCR error' });
//     }
// });


// server.post('/api/gpt', async (req, res) => {
//     try {
//         const { prompt, model } = req.body;
//         console.log(prompt)
//         // console.log(model)
//         const response = await axios.post(`https://api.openai.com/v1/engines/${model}/completions`, {
//             prompt: prompt,
//             max_tokens: 1000
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//             }
//         });

//         res.status(200).json({ text: response.data.choices[0].text });
//     } catch (error) {
//         console.error('Text generation error:', error);
//         res.status(500).json({ error: 'Text generation error' });
//     }
// });

// app.prepare().then(() => {
//     server.all('*', (req, res) => {
//         return handle(req, res);
//     });

//     server.listen(3000, (err) => {
//         if (err) {
//             console.error('Error starting server:', err);
//         } else {
//             console.log('> Ready on http://localhost:3000');
//         }
//     });
// });