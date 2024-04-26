// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for URL mappings
const urlMap = new Map();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.post('/shorten', (req, res) => {
    const { url } = req.body;

    if (!url) {
        console.log('Error: URL is required');
        return res.status(400).json({ error: 'URL is required' });
    }

    // Generate a short code (you can use any algorithm here)
    const shortCode = Math.random().toString(36).substring(7);

    // Store the mapping in the in-memory storage
    urlMap.set(shortCode, { url });

    // Log the shortened URL for debugging
    console.log('Shortened URL:', `http://localhost:${PORT}/${shortCode}`);

    // Return the shortened URL as JSON
    res.status(200).json({ shortUrl: `http://localhost:${PORT}/${shortCode}` });
});

  
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;

  // Check if the short code exists in the mapping
  if (urlMap.has(shortCode)) {
    const { url } = urlMap.get(shortCode);
    res.redirect(url);
  } else {
    res.status(404).send('Short URL not found');
  }
});

// Serve index.html
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
