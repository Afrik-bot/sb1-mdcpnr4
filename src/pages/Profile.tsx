import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu } from '@headlessui/react';
import { 
  UserCircleIcon, 
  BellIcon, 
  ShieldCheckIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header with Menu */}
      <div className="relative bg-gradient-to-b from-purple-500/20 to-gray-950 pt-10 pb-6 px-4">
        <div className="max-w-xl mx-auto">
          <div className="absolute top-4 right-4">
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 rounded-lg bg-gray-900/50 hover:bg-gray-900/80 transition-colors">
                <EllipsisVerticalIcon className="w-6 h-6 text-gray-300" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 rounded-xl bg-gray-900 border border-gray-800 shadow-lg overflow-hidden">
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${
                      active ? 'bg-gray-800' : ''
                    } flex items-center w-full px-4 py-3 text-left text-gray-300 hover:text-white`}>
                      <UserCircleIcon className="w-5 h-5 mr-3" />
                      Edit Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${
                      active ? 'bg-gray-800' : ''
                    } flex items-center w-full px-4 py-3 text-left text-gray-300 hover:text-white`}>
                      <ShieldCheckIcon className="w-5 h-5 mr-3" />
                      Privacy Settings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${
                      active ? 'bg-gray-800' : ''
                    } flex items-center w-full px-4 py-3 text-left text-gray-300 hover:text-white`}>
                      <BellIcon className="w-5 h-5 mr-3" />
                      Notifications
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${
                      active ? 'bg-gray-800' : ''
                    } flex items-center w-full px-4 py-3 text-left text-gray-300 hover:text-white`}>
                      <Cog6ToothIcon className="w-5 h-5 mr-3" />
                      Account Settings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button 
                      onClick={handleLogout}
                      disabled={isLoading}
                      className={`${
                        active ? 'bg-red-500/10' : ''
                      } flex items-center w-full px-4 py-3 text-left text-red-500 hover:text-red-400 border-t border-gray-800`}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                      {isLoading ? 'Logging out...' : 'Log Out'}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {currentUser?.email?.[0].toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {currentUser?.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-gray-400 text-sm">{currentUser?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">Likes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-4 pt-6">
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-medium text-white mb-4">About Me</h3>
          <p className="text-gray-400">No bio yet.</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">My Videos</h3>
          <div className="text-center py-8">
            <p className="text-gray-400">No videos yet.</p>
            <button className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
              Upload Your First Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}