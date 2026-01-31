# MongoDB Atlas Setup and Database Seeding

## Connection String

Your MongoDB Atlas connection is configured in `.env`:

```env
MONGODB_URI=mongodb+srv://nikhalambi_db_user:vjm%40123@vjm.l05zepj.mongodb.net/vjm-ngo?retryWrites=true&w=majority
```

**Note**: The `@` symbol in the password is URL-encoded as `%40`.

## Important: Network Access Configuration

If the seed script fails with a network error, you need to whitelist your IP address in MongoDB Atlas:

### Steps to Whitelist IP Address:

1. **Login to MongoDB Atlas**
   - Go to: https://cloud.mongodb.com
   - Login with your credentials

2. **Navigate to Network Access**
   - Click on "Network Access" in the left sidebar
   - Under "Security" section

3. **Add IP Address**
   - Click "ADD IP ADDRESS" button
   - Option 1: Click "ADD CURRENT IP ADDRESS" (recommended for development)
   - Option 2: Enter `0.0.0.0/0` to allow access from anywhere (less secure, but works everywhere)
   - Click "Confirm"

4. **Wait for Changes to Apply**
   - It may take 1-2 minutes for the changes to propagate

## Seeding the Database

### Option 1: Using the Seed Script (After IP Whitelisting)

```powershell
cd server
npm run seed
```

This will:
- Connect to MongoDB Atlas
- Clear existing projects
- Insert 8 comprehensive projects with all NGO initiatives
- Display success message

### Option 2: Manual Seeding via API (Alternative)

If the seed script doesn't work, you can seed the database manually using the API:

1. **Ensure both servers are running**
   ```powershell
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

2. **Use the seed API endpoint** (create this if needed)
   - Or use a tool like Postman/Thunder Client
   - POST to `http://localhost:5000/api/projects`
   - Send project data from `seed.js`

### Option 3: Use MongoDB Compass

1. **Download MongoDB Compass**: https://www.mongodb.com/try/download/compass
2. **Connect using your connection string**:
   ```
   mongodb+srv://nikhalambi_db_user:vjm@123@vjm.l05zepj.mongodb.net/vjm-ngo
   ```
3. **Create collections manually**:
   - Database: `vjm-ngo`
   - Collections: `projects`, `contacts`
4. **Import data** from the seed.js file

## Database Collections

### 1. Projects Collection

Schema:
```javascript
{
  title: String (required),
  description: String (required),
  category: String (enum: 'forest', 'water', 'community', 'technology'),
  image: String,
  impactMetrics: {
    value: String,
    unit: String
  },
  isActive: Boolean,
  createdAt: Date
}
```

### 2. Contacts Collection

Schema:
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  message: String (required),
  createdAt: Date
}
```

## Verifying Database Connection

### Check Server Logs

When you start the backend server (`npm run dev`), you should see:

```
✅ MongoDB Connected: vjm.l05zepj.mongodb.net
📡 Mongoose connected to MongoDB
🚀 Server running on port 5000
```

If you see connection errors, check:
1. IP whitelist in MongoDB Atlas
2. Connection string is correct
3. Password is URL-encoded (`@` as `%40`)
4. Internet connection is working

## Fallback Behavior

The frontend is configured with fallback data:
- If the API fails or database is empty, it will display static project data
- This ensures the website always shows content
- Once the database is seeded, it will automatically fetch from MongoDB

## Troubleshooting

### Error: "IP not whitelisted"
- Add your IP address in MongoDB Atlas Network Access
- Or use `0.0.0.0/0` for development (allows all IPs)

### Error: "Authentication failed"
- Verify username: `nikhalambi_db_user`
- Verify password: `vjm@123` (encoded as `vjm%40123` in connection string)
- Check user permissions in MongoDB Atlas

### Error: "Connection timeout"
- Check internet connection
- Verify firewall isn't blocking MongoDB Atlas (port 27017)
- Try using a different network

### Database is empty after seeding
- Check server logs for errors
- Verify the seed script completed successfully
- Use MongoDB Compass to inspect the database directly

## Next Steps

1. ✅ Whitelist your IP in MongoDB Atlas
2. ✅ Run `npm run seed` to populate the database
3. ✅ Verify projects appear on the website
4. ✅ Test contact form to ensure data is saved

---

**Current Status**: 
- ✅ MongoDB Atlas connection configured
- ✅ Seed script created with 8 projects
- ✅ Frontend configured to fetch from API with fallback
- ⏳ Waiting for IP whitelist configuration to run seed script
