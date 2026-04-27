# Blog App - Frontend

A modern React-based frontend for a MERN stack blog application with role-based dashboards and article management.

## Features

- **User Authentication**: Login, register, and role-based access control
- **Role-Based Dashboards**: 
  - USER: View and comment on articles
  - AUTHOR: Create, edit, and manage articles
  - ADMIN: Manage all articles and users
- **Article Management**: Create, read, edit, and delete articles
- **Comment System**: Users can comment on articles
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Toast Notifications**: Real-time feedback for user actions
- **State Management**: Zustand for global state management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on http://localhost:3000 (or configured in .env)

## Installation

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file using `.env.example` as template:
```bash
cp .env.example .env.local
```

4. Configure your API endpoint in `.env.local`:
```
VITE_API_URL=http://localhost:3000
```

## Running the Development Server

Start the Vite development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Footer.jsx       # Footer
│   │   ├── Home.jsx         # Home page
│   │   ├── Login.jsx        # Login form
│   │   ├── Register.jsx     # Registration form
│   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   ├── UserDashboard.jsx  # User dashboard
│   │   ├── AuthorDashboard.jsx # Author dashboard
│   │   ├── AdminDashboard.jsx  # Admin dashboard
│   │   ├── UserProfile.jsx    # User profile
│   │   ├── ArticleCard.jsx    # Article display & comments
│   │   ├── AddArticle.jsx     # Create article form
│   │   ├── EditArticle.jsx    # Edit article form
│   │   ├── RouteLayout.jsx    # Main layout wrapper
│   │   └── ErrorBoundary.jsx  # Error boundary
│   ├── store/
│   │   └── useAuth.js       # Zustand auth store
│   ├── config/
│   │   └── api.js           # API endpoints configuration
│   ├── styles/
│   │   └── common.js        # Tailwind CSS class constants
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── eslint.config.js         # ESLint configuration
└── package.json             # Dependencies
```

## Components Overview

### Pages
- **Home**: Landing page with navigation
- **Login**: User login form
- **Register**: User registration form
- **UserDashboard**: Display all active articles
- **AuthorDashboard**: Author's articles with edit/delete options
- **AdminDashboard**: All articles management table
- **UserProfile**: User account information and logout
- **ArticleCard**: Full article display with comments
- **AddArticle**: Create new article form
- **EditArticle**: Edit existing article form

### Layout Components
- **Header**: Navigation with role-based menu
- **Footer**: Footer information
- **RouteLayout**: Main layout wrapper with Header/Footer
- **ProtectedRoute**: Wrapper for authenticated-only routes

## State Management

### useAuth Store (Zustand)
```javascript
{
  // State
  currentUser,           // Current logged-in user
  isAuthenticated,       // Authentication status
  loading,               // Loading state
  error,                 // Error message
  isAuthReady,           // Auth check completed
  loggedIn,              // Login flag

  // Actions
  login(userObj),        // Login user
  logout(),              // Logout user
  checkAuth(),           // Verify authentication
}
```

## API Configuration

All API endpoints are centralized in `src/config/api.js` with the base URL from environment variables:

```javascript
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:3000";
```

### Endpoint Examples
```javascript
API_ENDPOINTS.LOGIN              // POST /common-api/login
API_ENDPOINTS.REGISTER           // POST /common-api/register
API_ENDPOINTS.USER_ARTICLES      // GET /user-api/articles
API_ENDPOINTS.AUTHOR_ARTICLES    // POST /author-api/articles
API_ENDPOINTS.EDIT_ARTICLE(id)   // PUT /author-api/articles/:id
```

## Authentication Flow

1. User registers with role (USER or AUTHOR)
2. On app load, `checkAuth()` is called to verify existing session
3. Protected routes check `isAuthenticated` status
4. Token stored in HTTP-only cookie (backend handles)
5. On logout, user is cleared from store and redirected

## Styling

Uses Tailwind CSS with predefined style constants in `src/styles/common.js`:
- Form components (formCard, formGroup, inputClass, submitBtn)
- Typography (pageTitleClass, headingClass, bodyText)
- Components (cardClass, primaryBtn, errorClass)
- Layout (navbarClass, articleGrid, divider)

All styles follow the color scheme and design system defined in common.js.

## Error Handling

- Form validation using react-hook-form
- API error handling with axios
- Toast notifications for user feedback
- Error boundaries for component failures
- Fallback UI for missing data

## Features by Role

### USER
- View all active articles
- Add comments to articles
- View profile and logout

### AUTHOR
- Create new articles
- Edit own articles
- Delete (soft) own articles
- View author dashboard
- Access write functionality from header

### ADMIN
- View all articles (active and inactive)
- Activate/deactivate articles
- Full system overview

## Development Tips

1. **API URLs**: All hardcoded URLs use `API_ENDPOINTS` from `config/api.js`
2. **State Management**: Use Zustand store for auth, component state for forms
3. **Error Handling**: Always wrap API calls in try-catch and show toast feedback
4. **Loading States**: Show loading UI during async operations
5. **Validation**: Use react-hook-form for client-side validation

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | `http://localhost:3000` |

## Troubleshooting

### Cannot connect to API
- Verify backend is running on configured port
- Check VITE_API_URL in .env.local
- Clear browser cookies and try again

### Token/Auth errors
- Clear localStorage and session storage
- Verify backend is sending correct auth token
- Check browser console for specific error messages

### CORS errors
- Verify backend CORS configuration
- Ensure withCredentials: true in API calls
- Check backend is running before frontend

### Build errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear .vite cache: `rm -rf .vite`
- Update dependencies: `npm update`

## Performance Optimization

- Components use React hooks for efficient re-renders
- Zustand provides lightweight state management
- Tailwind CSS provides optimized styles
- Images are optimized with lazy loading where applicable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style and component structure
2. Use meaningful component and variable names
3. Add proper error handling and loading states
4. Include toast notifications for user feedback
5. Test all routes and API integrations

## Deployment

Build for production:
```bash
npm run build
```

Output will be in `dist/` folder. Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Custom server with `npm run preview`

## License

ISC
