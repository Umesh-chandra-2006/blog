# Quick Reference Guide

## Common Commands

### Backend
```bash
cd backend
npm install                    # Install dependencies
npm start                      # Start server (port 3000)
npm run dev                    # Start with nodemon
```

### Frontend
```bash
cd frontend
npm install                    # Install dependencies
npm run dev                    # Start dev server (port 5173)
npm run build                  # Production build
npm run preview               # Preview production build
npm run lint                  # Run ESLint
```

## File Locations

### Add New Component
`frontend/src/components/YourComponent.jsx`

### Add New API Endpoint
1. Create route in `backend/apis/`
2. Add endpoint to `frontend/src/config/api.js`

### Add New Store
`frontend/src/store/yourStore.js` (use Zustand)

## API Call Pattern

```javascript
import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

// In component
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.get(
      API_ENDPOINTS.YOUR_ENDPOINT,
      { withCredentials: true }
    );
    // Handle success
    toast.success('Success!');
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Error occurred';
    setError(errorMsg);
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};
```

## Form Pattern

```javascript
import { useForm } from 'react-hook-form';
import { formCard, formGroup, labelClass, inputClass, submitBtn } from '../styles/common';

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (data) => {
  // Handle form submission
};

return (
  <form className={formCard} onSubmit={handleSubmit(onSubmit)}>
    <div className={formGroup}>
      <label className={labelClass}>Field Name</label>
      <input
        {...register('fieldName', { required: 'Field is required' })}
        className={inputClass}
      />
      {errors.fieldName && <p className="text-red-500 text-sm">{errors.fieldName.message}</p>}
    </div>
    <button type="submit" className={submitBtn}>Submit</button>
  </form>
);
```

## Protected Route

```javascript
// Wrap component with ProtectedRoute
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

## Authentication

```javascript
import { useAuth } from '../store/useAuth';

// In component
const currentUser = useAuth((state) => state.currentUser);
const logout = useAuth((state) => state.logout);
const isAuthenticated = useAuth((state) => state.isAuthenticated);
const loading = useAuth((state) => state.loading);
```

## Styling

```javascript
// Always use classes from common.js
import {
  formCard,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  primaryBtn,
  cardClass,
  errorClass,
  // ... more classes available
} from '../styles/common';
```

## Error Messages

```javascript
// Always show errors to user
try {
  // API call
} catch (err) {
  const errorMsg = err.response?.data?.message || 'An error occurred';
  toast.error(errorMsg);
  setError(errorMsg);
}
```

## Loading States

```javascript
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-gray-300 border-t-2"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

## Environment Variables

### Backend (.env)
```
MONGODB_URL=mongodb://localhost:27017/blog-app
PORT=3000
JWT_SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000
```

## Debugging Tips

1. **Backend**: Check console logs in terminal
2. **Frontend**: 
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for API calls
   - Use Zustand DevTools for state inspection

## Common Issues & Solutions

### CORS Error
- Ensure backend CORS is configured correctly
- Check if withCredentials: true is used
- Verify frontend URL matches CORS origin

### Token Expired
- Clear cookies and login again
- Check JWT_SECRET_KEY matches backend

### API Not Found
- Verify API endpoint in config/api.js
- Check backend route is defined
- Ensure backend is running

### Page Not Rendering
- Check component is exported correctly
- Verify route path matches in App.jsx
- Check console for errors

## Git Commands

```bash
git add .                      # Stage all changes
git commit -m "message"        # Commit changes
git push origin main           # Push to main branch
git status                     # Check status
git log                        # View commit history
```

## Performance Tips

1. Use React.memo for expensive components
2. Use useCallback for function props
3. Lazy load images with loading state
4. Minimize re-renders by proper state placement
5. Use Zustand for cross-component state

## Code Standards

- Use async/await over .then()
- Always handle errors in try-catch
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code style
- Keep components under 300 lines
- Separate concerns (components, hooks, utilities)

## Testing Checklist

Before committing:
- [ ] Code runs without errors
- [ ] No console.log statements (except logging)
- [ ] No hardcoded URLs (use config/api.js)
- [ ] Error handling is present
- [ ] Loading states work
- [ ] Toast notifications appear
- [ ] Responsive design works
- [ ] All imports are used

## Release Checklist

Before pushing to production:
- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables set correctly
- [ ] Build is successful
- [ ] CORS is configured for production domain
- [ ] Database is backed up
- [ ] API security is verified
- [ ] Documentation is updated
