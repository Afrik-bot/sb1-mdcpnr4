import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import LanguageSelector from '../components/LanguageSelector';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || '/express';
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center border border-gray-700/50 shadow-xl">
            <span className="text-2xl font-bold text-white">TT</span>
          </div>
        </div>

        <div className="mt-8">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}