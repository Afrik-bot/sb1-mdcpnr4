interface ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function Button({ children, loading, type = 'button', onClick }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}