import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EmailForm from './auth/EmailForm';
import PhoneForm from './auth/PhoneForm';

type AuthMethod = 'email' | 'phone';

export default function AuthForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup, resetPassword } = useAuth();

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const handleEmailSubmit = async (email: string, password: string, rememberMe: boolean) => {
    try {
      setError('');
      setLoading(true);

      if (isLogin) {
        await login(email, password, rememberMe);
        navigate('/express', { replace: true });
      } else {
        await signup(email, password);
        navigate('/express', { replace: true });
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (phone: string) => {
    try {
      setError('');
      setLoading(true);
      // Phone auth logic will be implemented here
      console.log('Phone auth:', phone);
      navigate('/express', { replace: true });
    } catch (err: any) {
      console.error('Phone auth error:', err);
      setError('Phone authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setError('Password reset instructions have been sent to your email.');
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800">
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex rounded-lg bg-gray-800/30 p-1">
        <button
          onClick={() => setAuthMethod('email')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            authMethod === 'email' 
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Email
        </button>
        <button
          onClick={() => setAuthMethod('phone')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            authMethod === 'phone' 
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Phone
        </button>
      </div>
      
      {authMethod === 'email' ? (
        <EmailForm
          isLogin={isLogin}
          onSubmit={handleEmailSubmit}
          onForgotPassword={handleForgotPassword}
          loading={loading}
        />
      ) : (
        <PhoneForm
          onSubmit={handlePhoneSubmit}
          loading={loading}
        />
      )}
      
      {authMethod === 'email' && (
        <div className="text-sm text-center">
          <span className="text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      )}
    </div>
  );
}