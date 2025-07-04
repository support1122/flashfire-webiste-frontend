// // server.js
// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import fetch from 'node-fetch'; // For Node <18. If using Node 18+, remove this line

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // ✅ Replace with your correct deployed Apps Script URL
// const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbygp29t46feDVbC8gF322gWiDs8sbHa8Cts_ODsYFABMuMvqvgMvb7gsZIYDKpzUUB0yQ/exec';

// app.post('/api/contact', async (req, res) => {
//   try {
//     const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(req.body),
//     });

//     if (!response.ok) throw new Error('Apps Script webhook failed');
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error('Error sending data to Google Apps Script:', err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// app.listen(8086, () => {
//   console.log('✅ Server listening on http://localhost:5001');
// });
