# Your Place - Mobile Accessories & Repair Services

A modern Next.js application for mobile accessories sales and repair service management.

## Features

- 🛍️ Product catalog with categories and search
- 🔧 Repair service booking system
- 👨‍💼 Admin dashboard for management
- 🌐 Multi-language support (English/Arabic)
- 📱 Responsive design
- 🔐 Secure authentication

## Quick Start

### Local Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your configuration.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

### Admin Access

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

*Note: These are automatically created if no admin user exists in the database.*

## Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables in Vercel Dashboard:**
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   DEFAULT_ADMIN_USERNAME=admin
   DEFAULT_ADMIN_PASSWORD=your-secure-password
   ```

4. **Deploy:**
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-app.vercel.app`

### Database Options

#### Option 1: SQLite (Default - Good for small projects)
- Uses local SQLite database
- Automatically created in `/data` directory
- Perfect for development and small deployments

#### Option 2: MongoDB Atlas (Recommended for production)
1. Create a free MongoDB Atlas cluster
2. Get your connection string
3. Add to environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mobile-shop
   ```
4. Update `lib/database.ts` to use MongoDB instead of SQLite

### Image Upload Options

#### Option 1: Local Storage (Default)
- Images stored in `/public/uploads`
- Works for development and small deployments

#### Option 2: Cloudinary (Recommended for production)
1. Create a free Cloudinary account
2. Add environment variables:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```
3. Update image upload logic to use Cloudinary SDK

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard pages
│   ├── products/          # Product pages
│   └── services/          # Service pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contexts/             # React contexts
├── lib/                  # Utility libraries
│   ├── auth.ts          # Authentication logic
│   ├── database.ts      # Database connection
│   └── i18n.ts          # Internationalization
└── data/                # SQLite database (local)
```

## API Endpoints

### Public APIs
- `GET /api/products` - Get products
- `POST /api/repair-requests` - Submit repair request

### Admin APIs (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/products` - Manage products
- `GET /api/admin/requests` - Manage repair requests

## Environment Variables

### Required
- `JWT_SECRET` - Secret key for JWT tokens

### Optional
- `DEFAULT_ADMIN_USERNAME` - Default admin username (default: admin)
- `DEFAULT_ADMIN_PASSWORD` - Default admin password (default: admin123)
- `DATABASE_PATH` - SQLite database path
- `MONGODB_URI` - MongoDB connection string
- `CLOUDINARY_*` - Cloudinary configuration

## Technologies Used

- **Framework:** Next.js 13+ (App Router)
- **Styling:** Tailwind CSS
- **Database:** SQLite (default) / MongoDB (optional)
- **Authentication:** JWT
- **UI Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React
- **Deployment:** Vercel

## Support

For issues and questions:
1. Check the GitHub issues
2. Review the deployment logs in Vercel
3. Ensure all environment variables are properly set

## License

MIT License - feel free to use this project for your mobile accessories business!"# Your-Place" 
