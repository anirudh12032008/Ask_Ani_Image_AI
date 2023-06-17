// import express from 'express';
// import multer from 'multer';
// import Tesseract from 'tesseract.js';

// const router = express.Router();
// const upload = multer().single('image');

// router.post('/', upload, async (req, res) => {
//     try {
//         console.log('ocr');
//         const { buffer } = req.file;
//         const { data: { text } } = await Tesseract.recognize(buffer);

//         res.status(200).json({ text });
//     } catch (error) {
//         console.error('Image OCR error:', error);
//         res.status(500).json({ error: 'Image OCR error' });
//     }
// });

// export default router;
