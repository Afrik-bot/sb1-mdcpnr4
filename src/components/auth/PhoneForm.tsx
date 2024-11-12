import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../lib/firebase';

interface PhoneFormProps {
  onSubmit: (phone: string) => Promise<void>;
  loading: boolean;
}

export default function PhoneForm({ onSubmit, loading }: PhoneFormProps) {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPhone(input);
    setError('');
  };

  const handleSendCode = async () => {
    if (!phone) {
      setError('Please enter a phone number');
      return;
    }

    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {},
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
        }
      });

      await recaptchaVerifier.render();
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      window.confirmationResult = confirmation;
      setShowVerification(true);
      setError('');
    } catch (error: any) {
      console.error('Send code error:', error);
      setError('Failed to send verification code. Please try again.');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) {
      setError('Please enter verification code');
      return;
    }

    try {
      if (!window.confirmationResult) {
        throw new Error('No verification code was sent');
      }
      await window.confirmationResult.confirm(verificationCode);
      await onSubmit(phone);
    } catch (error: any) {
      console.error('Verification error:', error);
      setError('Invalid verification code');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-900/20 rounded-lg">
          {error}
        </div>
      )}

      {!showVerification ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+1234567890"
              className="mt-1 block w-full rounded-lg bg-gray-800/50 border-gray-700/50 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div id="recaptcha-container"></div>

          <button
            type="button"
            onClick={handleSendCode}
            disabled={loading || !phone}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-100 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? 'Sending...' : 'Send Code'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-300">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="mt-1 block w-full rounded-lg bg-gray-800/50 border-gray-700/50 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !verificationCode}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-100 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowVerification(false);
              setVerificationCode('');
              setError('');
            }}
            className="w-full text-sm text-gray-400 hover:text-gray-300"
          >
            Change phone number
          </button>
        </form>
      )}
    </div>
  );
}