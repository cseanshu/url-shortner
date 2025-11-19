const express = require('express');
const router = express.Router();
const {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectToTarget
} = require('../controllers/linkController');

// Health check endpoint
router.get('/healthz', (req, res) => {
  res.json({ ok: true, version: "1.0", uptime: process.uptime() });
});

// API Routes
router.post('/api/links', createLink);           // Create a new link
router.get('/api/links', getAllLinks);           // Get all links (with optional search)
router.get('/api/links/:code', getLinkStats);    // Get stats for a specific link
router.delete('/api/links/:code', deleteLink);   // Delete a link

// Redirect route (must be last to avoid conflicts)
router.get('/:code', redirectToTarget);          // Redirect short code to target URL

module.exports = router;