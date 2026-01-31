import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';
import Project from './models/Project.js';

// Load environment variables
dotenv.config();

console.log('🔧 MongoDB Collection Creator\n');
console.log('This script will create the necessary collections in your MongoDB database.\n');

const createCollections = async () => {
    try {
        console.log('📡 Connecting to MongoDB...');
        console.log(`   URI: ${process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')}\n`);

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log('✅ MongoDB Connected Successfully!\n');

        // Create collections by creating and deleting a dummy document
        console.log('📊 Creating collections...\n');

        // Create Projects collection
        const dummyProject = new Project({
            title: 'Test Project',
            description: 'This is a test project that will be deleted',
            category: 'forest',
            image: '/test.png',
            impactMetrics: { value: '0', unit: 'test' },
            isActive: false
        });
        await dummyProject.save();
        await Project.deleteOne({ _id: dummyProject._id });
        console.log('   ✅ Created "projects" collection');

        // Create Contacts collection
        const dummyContact = new Contact({
            name: 'Test User',
            email: 'test@example.com',
            message: 'This is a test message that will be deleted'
        });
        await dummyContact.save();
        await Contact.deleteOne({ _id: dummyContact._id });
        console.log('   ✅ Created "contacts" collection\n');

        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📋 Available Collections:');
        collections.forEach(col => {
            console.log(`   - ${col.name}`);
        });

        console.log('\n✅ Collections created successfully!');
        console.log('\n💡 Next steps:');
        console.log('   1. Run "npm run seed" to populate with project data');
        console.log('   2. Or use the website to submit contact forms and create projects via API\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.log('\n💡 Troubleshooting:');
        console.log('   1. Check if your IP is whitelisted in MongoDB Atlas');
        console.log('   2. Go to https://cloud.mongodb.com → Network Access');
        console.log('   3. Add your current IP or use 0.0.0.0/0 for all IPs');
        console.log('   4. Verify your connection string in .env file');
        console.log('   5. Check your internet connection\n');
        process.exit(1);
    }
};

createCollections();
