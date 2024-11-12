import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Express from './pages/Express';
import Connect from './pages/Connect';
import Studio from './pages/Studio';
import Live from './pages/Live';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/express" element={<Express />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/live" element={<Live />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}