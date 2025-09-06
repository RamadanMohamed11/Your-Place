# Vercel Deployment Guide

## MongoDB Atlas Setup

### 1. Fix the Security Contact Issue
- Go to your MongoDB Atlas dashboard
- Navigate to **Organization Settings** → **Security Contact**
- Add a security contact email to stop receiving those notifications

### 2. Configure Network Access
- In MongoDB Atlas, go to **Network Access**
- Add `0.0.0.0/0` to allow connections from anywhere (for Vercel)
- Or add specific Vercel IP ranges for better security

### 3. Get Your Connection String
- Go to **Database** → **Connect** → **Connect your application**
- Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)

## Vercel Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel
```

### 4. Set Environment Variables in Vercel Dashboard
After deployment, go to your Vercel project dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add these environment variables (click "Add New"):

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority` | Production, Preview, Development |
| `JWT_SECRET` | `your-super-secret-jwt-key-here` | Production, Preview, Development |
| `DEFAULT_ADMIN_USERNAME` | `admin` | Production, Preview, Development |
| `DEFAULT_ADMIN_PASSWORD` | `admin123` | Production, Preview, Development |

**Important:** Replace the MongoDB URI with your actual connection string from MongoDB Atlas.

### 5. Redeploy
After adding environment variables, redeploy:
```bash
vercel --prod
```

## Environment Variables Reference

Create a `.env.local` file for local development:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas cluster is running
- Check that your IP is whitelisted (or use 0.0.0.0/0 for Vercel)
- Verify your connection string is correct

### Vercel Deployment Issues
- Check that all environment variables are set
- Ensure your build completes successfully
- Check Vercel function logs for any errors

## Security Notes
- Never commit `.env.local` to version control
- Use strong, unique passwords and secrets
- Consider using MongoDB Atlas IP whitelisting for production
- Regularly rotate your JWT secrets
