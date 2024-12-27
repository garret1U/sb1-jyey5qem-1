import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function App() {
  const { isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <>
      <Outlet />
      {location.pathname !== '/' && 
       location.pathname !== '/sign-in' && 
       location.pathname !== '/sign-up' && (
        <Navigate to="/" replace />
      )}
    </>
  );
}

export default App;
