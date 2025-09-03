import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { User } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Avatar from '../components/Avatar';

const tabs = ["Details", "Activity", "Settings"];

const Profile: React.FC = () => {
  const { user: contextUser } = useAppContext();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    // When contextUser changes (e.g., from Settings page), update profileUser
    setProfileUser(contextUser);
    setLoading(!contextUser);
  }, [contextUser]);


  if (loading || !profileUser) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-48 w-full" />
        <LoadingSkeleton className="h-12 w-1/3" />
        <LoadingSkeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="p-6">
          <div className="flex items-end -mt-16">
            <Avatar 
              name={profileUser.name} 
              className="w-24 h-24 border-4 border-light-card dark:border-dark-card"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{profileUser.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">@{profileUser.username}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`${activeTab === tab ? 'text-primary dark:text-indigo-400' : ''} relative py-2 px-4 font-medium transition-colors`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-indigo-400"
                      layoutId="underline"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'Details' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <p><strong>Email:</strong> {profileUser.email}</p>
                        <p><strong>Phone:</strong> {profileUser.phone}</p>
                        <p><strong>Website:</strong> <a href={`http://${profileUser.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">{profileUser.website}</a></p>
                        <p><strong>Company:</strong> {profileUser.company.name}</p>
                        <p><strong>Address:</strong> {`${profileUser.address.street}, ${profileUser.address.suite}, ${profileUser.address.city}`}</p>
                    </div>
                  )}
                   {activeTab === 'Activity' && <p>User activity will be displayed here.</p>}
                   {activeTab === 'Settings' && <p>User settings will be available here.</p>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;