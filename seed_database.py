#!/usr/bin/env python3
"""
MongoDB Database Seeder for VJM NGO Website
This script connects to MongoDB Atlas and populates the database with project data.
"""

from pymongo import MongoClient
from datetime import datetime
import sys

# MongoDB Atlas Connection String
MONGODB_URI = "mongodb+srv://nikhalambi_db_user:vjm%40123@vjm.l05zepj.mongodb.net/vjm-ngo?retryWrites=true&w=majority"

# Project data
projects = [
    {
        "title": "Miyawaki Forest Development",
        "description": "Developed 12 large Miyawaki forests at Hanuman Tekdi, Pipri Meghe, Arvi Road, Wardha. Successfully converted barren plateau into thriving green ecosystems with over 13,500 saplings planted. These dense forests grow 10 times faster and are 30 times denser than conventional plantations.",
        "category": "forest",
        "image": "/hero-bg.png",
        "impactMetrics": {
            "value": "13,500+",
            "unit": "Saplings Planted"
        },
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "title": "Groundwater Recharge Systems",
        "description": "Implemented 250 CCT (Continuous Contour Trenches) measuring 8×2×2 feet each, enabling approximately 2 crore litres of annual groundwater recharge. This innovative system captures rainwater and allows it to percolate into the ground, replenishing aquifers and securing water for future generations.",
        "category": "water",
        "image": "/water-project.png",
        "impactMetrics": {
            "value": "2 Crore",
            "unit": "Litres/Year Recharged"
        },
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "title": "Community Water Management Network",
        "description": "Developed comprehensive water management infrastructure including roof water harvesting systems, large and small soak pits, and 250+ Nanded-pattern soak pits. Created a 2.5 km channelised CCT network for efficient rainwater management across the community.",
        "category": "community",
        "image": "/community.png",
        "impactMetrics": {
            "value": "250+",
            "unit": "Soak Pits Installed"
        },
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "title": "Wastewater Reuse Initiative",
        "description": "Pioneering sustainable water management by reusing 3 lakh litres per day of treated wastewater from purification plant for groundwater recharge. This innovative approach reduces water wastage and contributes to the circular water economy.",
        "category": "water",
        "image": "/water-project.png",
        "impactMetrics": {
            "value": "3 Lakh",
            "unit": "Litres/Day Reused"
        },
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "title": "Bhujal Moist Soil Appliance",
        "description": "Developed and deployed innovative Bhujal Moist Soil Appliance technology for moisture retention and groundwater sustainability. This cutting-edge solution ensures long-term water security for both agricultural and domestic use, helping farmers maintain soil moisture during dry periods.",
        "category": "technology",
        "image": "/hero-bg.png",
        "impactMetrics": {
            "value": "Innovative",
            "unit": "Sustainable Solution"
        },
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "title": "Water Bank Project",
        "description": "Established Water Bank Project with ₹4.5 lakh fund supporting water conservation initiatives across 18 villages in 4 talukas. Empowering communities to manage their water resources sustainably and build resilience against water scarcity.",
        "category": "community",
        "image": "/community.png",
        "impactMetrics": {
            "value": "18",
            "unit": "Villages Supported"
        },
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "title": "Satyamev Jayate Water Cup Participation",
        "description": "Active participation in the prestigious Satyamev Jayate Water Cup initiative, mobilizing over 15,000 citizens in Shramdaan (community service) activities. This mass movement has created widespread awareness about water conservation and environmental protection.",
        "category": "community",
        "image": "/community.png",
        "impactMetrics": {
            "value": "15,000+",
            "unit": "Citizens Involved"
        },
        "isActive": True,
        "createdAt": datetime.utcnow()
    },
    {
        "title": "Multi-Taluka Water Conservation Program",
        "description": "Expanded water conservation efforts across 4 talukas, implementing integrated water management solutions. This program combines traditional wisdom with modern technology to ensure water security for rural communities.",
        "category": "water",
        "image": "/water-project.png",
        "impactMetrics": {
            "value": "4",
            "unit": "Talukas Covered"
        },
        "isActive": True,
        "createdAt": datetime.utcnow()
    }
]

def seed_database():
    """Connect to MongoDB and seed the database with project data."""
    
    print("🔧 MongoDB Database Seeder")
    print("=" * 50)
    print()
    
    try:
        # Connect to MongoDB
        print("📡 Connecting to MongoDB Atlas...")
        print(f"   URI: {MONGODB_URI.replace(':vjm%40123@', ':****@')}")
        print()
        
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=10000)
        
        # Test connection
        client.admin.command('ping')
        print("✅ Successfully connected to MongoDB Atlas!")
        print()
        
        # Get database and collection
        db = client['vjm-ngo']
        projects_collection = db['projects']
        
        # Clear existing projects
        deleted_count = projects_collection.delete_many({}).deleted_count
        print(f"🗑️  Cleared {deleted_count} existing projects")
        print()
        
        # Insert new projects
        print("📊 Inserting projects...")
        result = projects_collection.insert_many(projects)
        print(f"✅ Successfully inserted {len(result.inserted_ids)} projects!")
        print()
        
        # Display inserted projects
        print("📋 Inserted Projects:")
        for i, project in enumerate(projects, 1):
            print(f"   {i}. {project['title']} ({project['category']})")
        
        print()
        print("=" * 50)
        print("✅ Database seeding completed successfully!")
        print()
        print("💡 Next steps:")
        print("   1. Check MongoDB Atlas to verify the data")
        print("   2. Refresh your website to see the projects")
        print("   3. Test the contact form")
        print()
        
        client.close()
        return 0
        
    except Exception as e:
        print()
        print("❌ Error:", str(e))
        print()
        print("💡 Troubleshooting:")
        print("   1. Check if your IP is whitelisted in MongoDB Atlas")
        print("   2. Verify the connection string is correct")
        print("   3. Ensure you have internet connection")
        print("   4. Check if port 27017 is blocked by firewall")
        print()
        return 1

if __name__ == "__main__":
    sys.exit(seed_database())
