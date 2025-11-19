const express = require('express');
const router = express.Router();
const {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectToTarget
} = require('../controllers/linkController');

router.get('/healthz', (req, res) => {
  res.json({ ok: true, version: "1.0", uptime: process.uptime() });
});

router.post('/api/links', createLink);           
router.get('/api/links', getAllLinks);           
router.get('/api/links/:code', getLinkStats);    
router.delete('/api/links/:code', deleteLink); 


router.get('/:code', redirectToTarget);   
module.exports = router;