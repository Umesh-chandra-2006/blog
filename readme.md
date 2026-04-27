# Blog App - MERN Stack

A full-stack blog application built with MongoDB, Express.js, React, and Node.js featuring role-based access control, article management, and commenting system.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or cloud)
- npm or yarn

### Setup

1. **Clone the repository** (if applicable)
```bash
git clone <repository-url>
cd Blog-App
```

2. **Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URL and other configuration
npm install
npm start
```

The backend will run on `http://localhost:3000`

3. **Frontend Setup** (in another terminal)
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your API URL (should be http://localhost:3000)
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📋 Features

### User Roles
- **USER**: Browse articles and leave comments
- **AUTHOR**: Create, edit, and manage articles
- **ADMIN**: Manage all articles and users

### Core Features
✓ User authentication with JWT
✓ Role-based access control
✓ Article CRUD operations
✓ Comment system
✓ Responsive design
✓ Toast notifications
✓ Error handling
✓ Loading states

## 📁 Project Structure

```
Blog-App/
├── backend/                    # Express.js API
│   ├── apis/                  # Route handlers
│   ├── config/                # Configuration files
│   ├── middleware/            # Custom middleware
│   ├── models/                # Mongoose schemas
│   ├── services/              # Business logic
│   ├── server.js              # Express app
│   ├── package.json
│   ├── .env.example
│   └── readme_api.md          # API documentation
│
├── frontend/                   # React.js UI
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── config/            # API configuration
│   │   ├── store/             # Zustand state
│   │   ├── styles/            # Tailwind classes
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── README_FRONTEND.md     # Frontend documentation
│
├── .gitignore
└── FINAL_REVIEW_CHECKLIST.md  # Deployment checklist

```

## 🔧 Configuration

### Backend (.env)
```env
MONGODB_URL=mongodb://localhost:27017/blog-app
PORT=3000
JWT_SECRET_KEY=your_secret_key_here
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3000
```

## 📚 Documentation

- **[Backend API Documentation](./backend/readme_api.md)** - Detailed API endpoints and setup
- **[Frontend Documentation](./frontend/README_FRONTEND.md)** - React components and features
- **[Deployment Checklist](./FINAL_REVIEW_CHECKLIST.md)** - Pre-deployment checklist

## 🔐 Security Features

- Password hashing with bcryptjs (10 rounds)
- JWT token-based authentication (1 hour expiry)
- HTTP-only cookies for token storage
- CORS configuration
- Role-based middleware protection
- Input validation and error handling

## 🎯 API Endpoints Summary

### Authentication
- `POST /common-api/register` - Register user
- `POST /common-api/login` - Login user
- `GET /common-api/logout` - Logout user
- `GET /common-api/check-auth` - Verify session

### User Routes
- `GET /user-api/articles` - Get all articles
- `PUT /user-api/comment/articleid/:id` - Add comment

### Author Routes
- `POST /author-api/articles` - Create article
- `GET /author-api/articles/myarticles` - Get author's articles
- `PUT /author-api/articles/:id` - Update article
- `PATCH /author-api/articles/:id` - Delete article

### Admin Routes
- `GET /admin-api/articles` - Get all articles
- `PUT /admin-api/users/:id` - Block/unblock user
- `PUT /admin-api/articles/:id` - Activate/deactivate article

## 🧪 Testing Checklist

Before pushing to production, test:

- [ ] User registration (USER and AUTHOR roles)
- [ ] User login/logout
- [ ] Navigation between pages
- [ ] USER dashboard and article viewing
- [ ] USER commenting functionality
- [ ] AUTHOR article creation
- [ ] AUTHOR article editing
- [ ] AUTHOR article deletion
- [ ] ADMIN article management
- [ ] Error handling and validation
- [ ] Toast notifications
- [ ] Loading states
- [ ] Responsive design

## 🚢 Deployment

1. **Prepare for deployment:**
   - Update environment variables for production
   - Set `secure: true` in cookie options (backend)
   - Update CORS origin to production domain
   - Generate strong JWT_SECRET_KEY
   - Use production MongoDB URL

2. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to:**
   - **Frontend**: Vercel, Netlify, or GitHub Pages
   - **Backend**: Heroku, Railway, DigitalOcean, AWS EC2

## 🐛 Troubleshooting

### Cannot connect to MongoDB
- Verify MongoDB is running
- Check connection string in .env
- For MongoDB Atlas, ensure IP whitelist includes your IP

### CORS errors
- Verify backend CORS configuration
- Check frontend API URL in .env.local
- Clear browser cache and cookies

### Authentication errors
- Clear all cookies and login again
- Verify JWT_SECRET_KEY is correct
- Check token expiry time

### Port already in use
- Backend: Change PORT in .env
- Frontend: Vite will use next available port

## 📦 Dependencies

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- dotenv - Environment configuration
- cors - CORS middleware
- cookie-parser - Cookie handling

### Frontend
- React - UI framework
- Vite - Build tool
- React Router - Navigation
- Axios - HTTP client
- Zustand - State management
- React Hook Form - Form handling
- React Hot Toast - Notifications
- Tailwind CSS - Styling
- ESLint - Code linting

## 📝 Code Style

The project follows consistent code style:
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error Handling**: Try-catch blocks with proper error messages
- **Async Operations**: Async/await pattern
- **State Management**: Zustand for global, React hooks for local
- **Styling**: Tailwind CSS utility classes
- **Components**: Functional components with hooks

## 🤝 Contributing

When contributing:
1. Follow existing code style
2. Add proper error handling
3. Include toast notifications for user feedback
4. Test all changes locally
5. Update documentation as needed
6. Use meaningful commit messages

## 📄 License

ISC

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the troubleshooting section
3. Check browser console for errors
4. Review backend logs for API errors

---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
