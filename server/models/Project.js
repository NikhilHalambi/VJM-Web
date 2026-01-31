import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['forest', 'water', 'community', 'technology'],
        default: 'community'
    },
    image: {
        type: String,
        default: '/images/default-project.jpg'
    },
    impactMetrics: {
        value: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
