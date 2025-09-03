import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Users } from 'lucide-react';

const projects = [
  { name: 'AuraDash UI Kit', description: 'Developing the next-gen dashboard components.', progress: 75, members: 4, deadline: '2 weeks' },
  { name: 'API Integration', description: 'Connecting the frontend to the new backend services.', progress: 40, members: 2, deadline: '1 month' },
  { name: 'Mobile App Launch', description: 'Final preparations for the iOS and Android app release.', progress: 90, members: 8, deadline: '3 days' },
  { name: 'Marketing Website', description: 'Redesigning the public-facing marketing website.', progress: 20, members: 3, deadline: '2 months' },
];

const Projects: React.FC = () => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-bold">
        Projects
      </motion.h1>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <motion.div 
            key={project.name}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg space-y-4 transition-shadow duration-300 hover:shadow-glow-secondary"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{project.name}</h2>
              <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{project.deadline}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-primary dark:text-white">Progress</span>
                    <span className="text-sm font-medium text-primary dark:text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <motion.div 
                        className="bg-primary h-2.5 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
               <div className="flex items-center">
                  <ClipboardList className="w-4 h-4 mr-1.5"/> Tasks: 24
               </div>
               <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1.5"/> Members: {project.members}
               </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;