const express = require('express');
const router = express.Router();
const { getLeads, getLeadById, createLead, updateLead, deleteLead, getDashboardStats } = require('../controllers/leadController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/dashboard', getDashboardStats);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
