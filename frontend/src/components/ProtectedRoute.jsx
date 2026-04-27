import { Navigate } from 'react-router';
import { useAuth } from '../store/useAuth';

const ProtectedRoute = ({ children }) => {
  const { loading, currentUser, isAuthenticated, isAuthReady } = useAuth();

  if (loading || !isAuthReady) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  return children;
};

export default ProtectedRoute;