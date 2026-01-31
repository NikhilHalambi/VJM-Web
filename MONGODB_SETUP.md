# MongoDB Setup Guide - Local Community Version

## Using MongoDB Community Edition (No API Keys Required)

The project is configured to use **MongoDB Community Edition** running locally on your machine. This version is completely free and does not require any API keys, authentication, or cloud services.

### Installation Steps

#### Windows

1. **Download MongoDB Community Edition**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download the latest version

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Install MongoDB as a Service (recommended)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify Installation**
   ```powershell
   # Check if MongoDB service is running
   Get-Service MongoDB
   
   # Or start MongoDB manually
   mongod --dbpath="C:\data\db"
   ```

4. **Default Connection**
   - MongoDB runs on: `mongodb://localhost:27017`
   - No username/password required for local development
   - Database will be created automatically when first accessed

### Current Configuration

The `.env` file is already configured for local MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/vjm-ngo
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**No changes needed!** The connection string uses:
- `localhost` - Your local machine
- `27017` - Default MongoDB port
- `vjm-ngo` - Database name (created automatically)
- No authentication required

### Verify MongoDB is Running

```powershell
# Option 1: Check Windows Services
services.msc
# Look for "MongoDB" service - should be "Running"

# Option 2: Use MongoDB Shell
mongosh
# Should connect to: mongodb://localhost:27017

# Option 3: Check with Node.js
# Just start the backend server - it will show connection status
cd server
npm run dev
# Look for: "✅ MongoDB Connected: localhost"
```

### Using MongoDB Compass (Optional GUI)

If you installed MongoDB Compass:
1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. You'll see the `vjm-ngo` database after first contact form submission

### Troubleshooting

**MongoDB not running?**
```powershell
# Start MongoDB service
net start MongoDB

# Or run manually
mongod --dbpath="C:\data\db"
```

**Port 27017 already in use?**
- Another MongoDB instance might be running
- Check Task Manager and close duplicate processes

**Connection refused?**
- Ensure MongoDB service is started
- Check firewall settings
- Verify MongoDB is installed correctly

### Alternative: MongoDB Atlas (Cloud - Optional)

If you prefer a cloud solution (still free, but requires signup):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0 tier - no credit card required)
3. Get connection string
4. Update `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vjm-ngo
   ```

**However, local MongoDB Community Edition is recommended for development - it's simpler and requires no API keys or internet connection!**

---

## Summary

✅ **MongoDB Community Edition** - Free, local, no API keys  
✅ **Already configured** in `.env` file  
✅ **Auto-creates database** on first use  
✅ **No authentication** required for local development  
✅ **Works offline** - no internet needed  

Just ensure MongoDB service is running and you're good to go!
