import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contacts - Submit contact form and trigger notifications
router.post('/', submitContactForm);

export default router;
