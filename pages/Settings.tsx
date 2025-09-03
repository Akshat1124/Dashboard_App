import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Lock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings: React.FC = () => {
    const { user, updateUser } = useAppContext();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        email: user?.email || '',
    });
    const [isSaved, setIsSaved] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const ToggleSwitch: React.FC<{ defaultChecked?: boolean }> = ({ defaultChecked }) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" defaultChecked={defaultChecked} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
        </label>
      );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-bold">
        Settings
      </motion.h1>

      {/* Profile Settings */}
      <motion.div variants={itemVariants} className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-glow-primary">
        <h2 className="text-xl font-semibold flex items-center mb-4"><User className="mr-2"/> Profile Settings</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
             <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
             <div className="flex justify-end items-center gap-4">
                <AnimatePresence>
                {isSaved && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center text-green-500"
                    >
                        <CheckCircle className="mr-2" size={20}/>
                        <span>Changes saved!</span>
                    </motion.div>
                )}
                </AnimatePresence>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">Save Changes</button>
            </div>
        </form>
      </motion.div>

      {/* Notification Settings */}
      <motion.div variants={itemVariants} className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-glow-primary">
        <h2 className="text-xl font-semibold flex items-center mb-4"><Bell className="mr-2"/> Notifications</h2>
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <p>Email notifications for new messages</p>
                <ToggleSwitch defaultChecked={true}/>
            </div>
             <div className="flex justify-between items-center">
                <p>Push notifications for project updates</p>
                <ToggleSwitch defaultChecked={true}/>
            </div>
             <div className="flex justify-between items-center">
                <p>Weekly activity summary email</p>
                <ToggleSwitch />
            </div>
        </div>
      </motion.div>

       {/* Security Settings */}
       <motion.div variants={itemVariants} className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-glow-primary">
        <h2 className="text-xl font-semibold flex items-center mb-4"><Lock className="mr-2"/> Security</h2>
        <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors">Change Password</button>
      </motion.div>

    </motion.div>
  );
};

export default Settings;