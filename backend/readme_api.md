# Blog App - Backend

A robust Express.js backend for a MERN stack blog application with role-based access control (User, Author, Admin).

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Article Management**: Create, read, update, and delete articles with soft delete functionality
- **Comments System**: Users can comment on articles
- **Role-Based Access**: Three user roles - USER, AUTHOR, ADMIN
- **Security**: Password hashing with bcryptjs, JWT token verification
- **Error Handling**: Comprehensive error handling for validation and database errors
- **Environment Configuration**: Configurable via .env file

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file using `.env.example` as template:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
   - Set your MongoDB connection URL
   - Set JWT secret key
   - Set the port (default: 3000)
   - Configure Cloudinary credentials (optional)

## Running the Server

Start the development server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication (Common)
- `POST /common-api/register` - Register new user
- `POST /common-api/login` - Login user
- `GET /common-api/logout` - Logout user
- `GET /common-api/check-auth` - Verify authentication
- `PUT /common-api/update-password` - Update password (authenticated)
- `PUT /common-api/forgot-password` - Reset password

### User Routes
- `GET /user-api/articles` - Get all active articles
- `PUT /user-api/comment/articleid/:articleId` - Add comment to article

### Author Routes
- `POST /author-api/articles` - Create new article
- `GET /author-api/articles/myarticles` - Get author's articles
- `PUT /author-api/articles/:articleId` - Update article
- `PATCH /author-api/articles/:articleId` - Soft delete article

### Admin Routes
- `GET /admin-api/articles` - Get all articles (including inactive)
- `PUT /admin-api/users/:userId` - Block/unblock user
- `PUT /admin-api/articles/:articleId` - Activate/deactivate article

## Project Structure

```
backend/
├── apis/              # Route handlers
│   ├── users.js       # User API routes
│   ├── authors.js     # Author API routes
│   ├── admins.js      # Admin API routes
│   └── commonApi.js   # Authentication routes
├── config/            # Configuration files
│   ├── cloudinary.js  # Cloudinary setup
│   └── multer.js      # Multer file upload config
├── middleware/        # Custom middleware
│   └── verifyToken.js # JWT verification
├── models/            # Mongoose schemas
│   ├── user.js        # User model
│   └── article.js     # Article model
├── services/          # Business logic
│   └── auth-service.js # Authentication logic
├── server.js          # Express app setup
└── package.json       # Dependencies
```

## Database Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  profileImageUrl: String,
  role: Enum['ADMIN', 'AUTHOR', 'USER'],
  isActive: Boolean (default: true)
}
```

### Article Model
```javascript
{
  author: ObjectId (ref: User),
  title: String,
  category: String,
  content: String,
  comments: [{
    user: ObjectId (ref: User),
    comment: String
  }],
  isArticleActive: Boolean (default: true)
}
```

## Error Handling

The API includes error handling for:
- Mongoose validation errors (400)
- Invalid ObjectIds (400)
- Duplicate key errors (409)
- Token expired errors (401)
- Invalid token errors (401)
- Unauthorized access (403)
- Server errors (500)

## Security Features

- Password hashing using bcryptjs (10 salt rounds)
- JWT token-based authentication (1 hour expiry)
- HTTP-only cookies for token storage
- CORS configuration for frontend
- Role-based middleware for route protection
- Input validation and sanitization

## Deployment

### Before deploying:
1. Ensure all environment variables are set
2. Set `secure: true` in cookie options for production
3. Set appropriate CORS origin for production domain
4. Use production MongoDB URL
5. Generate strong JWT_SECRET_KEY

### Common deployment platforms:
- Heroku
- DigitalOcean
- Railway
- AWS EC2

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URL | MongoDB connection string | `mongodb://localhost:27017/blog-app` |
| PORT | Server port | `3000` |
| JWT_SECRET_KEY | Secret key for JWT signing | `your_super_secret_key` |
| CLOUDINARY_CLOUD_NAME | Cloudinary account name | `your_cloud_name` |
| CLOUDINARY_API_KEY | Cloudinary API key | `123456789` |
| CLOUDINARY_API_SECRET | Cloudinary API secret | `your_secret` |
| FRONTEND_URL | Frontend application URL | `http://localhost:5173` |

## Troubleshooting

### Cannot connect to MongoDB
- Verify MongoDB is running
- Check connection string in .env
- Ensure network access if using MongoDB Atlas

### JWT Token errors
- Clear cookies and login again
- Verify JWT_SECRET_KEY is set correctly
- Check token hasn't expired

### CORS errors
- Verify frontend URL in CORS configuration
- Ensure credentials: true is set in frontend axios calls

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Use meaningful variable names
4. Comment complex logic
5. Test all endpoints before committing

## License

ISC
