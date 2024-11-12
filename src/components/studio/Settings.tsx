import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { VideoCameraIcon, ChatBubbleLeftIcon, HeartIcon, ArrowDownTrayIcon, BellIcon, EnvelopeIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface Settings {
  autoPublish: boolean;
  enableComments: boolean;
  showLikes: boolean;
  allowDownloads: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: string;
  privacyMode: boolean;
}

export default function Settings() {
  const [settings, setSettings] = useState<Settings>({
    autoPublish: false,
    enableComments: true,
    showLikes: true,
    allowDownloads: false,
    emailNotifications: true,
    pushNotifications: true,
    language: 'en',
    privacyMode: false
  });

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingRow = ({ 
    icon: Icon, 
    title, 
    description, 
    value, 
    onChange 
  }: { 
    icon: typeof VideoCameraIcon;
    title: string;
    description: string;
    value: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <Icon className="w-6 h-6 text-purple-500 mt-1" />
        <div>
          <span className="text-white font-medium">{title}</span>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <Switch
        checked={value}
        onChange={onChange}
        className={`${
          value ? 'bg-purple-500' : 'bg-gray-700'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
      >
        <span className={`${
          value ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
      </Switch>
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-lg font-medium text-white mb-6">Studio Settings</h2>

      <div className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Video Preferences</h3>
          <div className="space-y-4">
            <SettingRow
              icon={VideoCameraIcon}
              title="Auto-publish videos"
              description="Automatically publish videos after upload"
              value={settings.autoPublish}
              onChange={(value) => updateSetting('autoPublish', value)}
            />
            <SettingRow
              icon={ChatBubbleLeftIcon}
              title="Enable comments"
              description="Allow viewers to comment on your videos"
              value={settings.enableComments}
              onChange={(value) => updateSetting('enableComments', value)}
            />
            <SettingRow
              icon={HeartIcon}
              title="Show likes"
              description="Display like count on videos"
              value={settings.showLikes}
              onChange={(value) => updateSetting('showLikes', value)}
            />
            <SettingRow
              icon={ArrowDownTrayIcon}
              title="Allow downloads"
              description="Let viewers download your videos"
              value={settings.allowDownloads}
              onChange={(value) => updateSetting('allowDownloads', value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Notifications</h3>
          <div className="space-y-4">
            <SettingRow
              icon={EnvelopeIcon}
              title="Email notifications"
              description="Receive updates via email"
              value={settings.emailNotifications}
              onChange={(value) => updateSetting('emailNotifications', value)}
            />
            <SettingRow
              icon={BellIcon}
              title="Push notifications"
              description="Receive push notifications"
              value={settings.pushNotifications}
              onChange={(value) => updateSetting('pushNotifications', value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">General</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <GlobeAltIcon className="w-6 h-6 text-purple-500 mt-1" />
                <div>
                  <span className="text-white font-medium">Language</span>
                  <p className="text-sm text-gray-400">Select your preferred language</p>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-purple-500"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="sw">Swahili</option>
              </select>
            </div>
            <SettingRow
              icon={ShieldCheckIcon}
              title="Privacy mode"
              description="Enhanced privacy for your content"
              value={settings.privacyMode}
              onChange={(value) => updateSetting('privacyMode', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}