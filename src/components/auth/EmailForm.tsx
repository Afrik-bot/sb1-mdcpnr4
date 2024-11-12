import { useState } from 'react';

interface EmailFormProps {
  isLogin: boolean;
  onSubmit: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  onForgotPassword: (email: string) => Promise<void>;
  loading: boolean;
}

export default function EmailForm({ isLogin, onSubmit, onForgotPassword, loading }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await onSubmit(email, password, rememberMe);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
          placeholder="you@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
            Remember me
          </label>
        </div>

        {isLogin && (
          <button
            type="button"
            onClick={() => onForgotPassword(email)}
            className="text-sm font-medium text-purple-400 hover:text-purple-300"
          >
            Forgot password?
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !email || !password}
        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-100 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
      >
        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
      </button>
    </form>
  );
}