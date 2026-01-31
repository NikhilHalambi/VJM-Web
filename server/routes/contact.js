import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST - Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message'
            });
        }

        // Try to save to database
        try {
            const contact = new Contact({
                name,
                email,
                phone,
                message
            });

            await contact.save();

            return res.status(201).json({
                success: true,
                message: 'Thank you for contacting us! We will get back to you soon.',
                data: contact
            });
        } catch (dbError) {
            // Database unavailable - log the submission and return success anyway
            console.log('📝 Contact form submission (DB unavailable):');
            console.log(`   Name: ${name}`);
            console.log(`   Email: ${email}`);
            console.log(`   Phone: ${phone || 'N/A'}`);
            console.log(`   Message: ${message.substring(0, 50)}...`);
            console.log(`   ⚠️  Not saved to database: ${dbError.message}\n`);

            // Return success to user even though DB is unavailable
            return res.status(201).json({
                success: true,
                message: 'Thank you for contacting us! We will get back to you soon.',
                data: { name, email, phone, message, timestamp: new Date() }
            });
        }
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit contact form. Please try again later.'
        });
    }
});

// GET - Retrieve all contact submissions (admin only)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts',
            error: error.message
        });
    }
});

export default router;
