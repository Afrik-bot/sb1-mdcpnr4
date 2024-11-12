import { HomeIcon, UsersIcon, PlusCircleIcon, VideoCameraIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-950/90 backdrop-blur-lg border-t border-gray-800 z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2">
        <Link 
          to="/express" 
          className={`flex flex-col items-center p-2 ${isActive('/express') ? 'text-purple-500' : 'text-gray-400'}`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Express</span>
        </Link>
        
        <Link 
          to="/connect" 
          className={`flex flex-col items-center p-2 ${isActive('/connect') ? 'text-purple-500' : 'text-gray-400'}`}
        >
          <UsersIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Connect</span>
        </Link>
        
        <Link 
          to="/studio" 
          className={`flex flex-col items-center p-2 ${isActive('/studio') ? 'text-purple-500' : 'text-gray-400'}`}
        >
          <PlusCircleIcon className="w-8 h-8 -mt-4 text-purple-500" />
          <span className="text-xs mt-1">Studio</span>
        </Link>
        
        <Link 
          to="/live" 
          className={`flex flex-col items-center p-2 ${isActive('/live') ? 'text-purple-500' : 'text-gray-400'}`}
        >
          <VideoCameraIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Live</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center p-2 ${isActive('/profile') ? 'text-purple-500' : 'text-gray-400'}`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}