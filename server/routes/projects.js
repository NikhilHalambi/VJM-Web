import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET /api/projects - Get all active projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch projects'
        });
    }
});

// POST /api/projects - Create new project (Admin)
router.post('/', async (req, res) => {
    try {
        const { title, description, category, image, impactMetrics } = req.body;

        const project = new Project({
            title,
            description,
            category,
            image,
            impactMetrics
        });

        await project.save();

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    } catch (error) {
        console.error('Project creation error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create project'
        });
    }
});

export default router;
