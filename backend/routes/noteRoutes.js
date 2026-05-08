const express = require('express');
const router = express.Router();
const { getNotesByLeadId, addNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/:leadId', getNotesByLeadId);
router.post('/', addNote);

module.exports = router;
