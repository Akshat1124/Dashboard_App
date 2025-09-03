import React from 'react';
import { motion } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, prefix = '', suffix = '', color }) => {
  const animatedValue = useCountUp(value);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg flex items-center space-x-4 transition-all duration-300 hover:shadow-glow-primary"
    >
      <div className={`p-3 rounded-full bg-opacity-20 ${color.replace('text-', 'bg-')}`}>
        <div className={color}>{icon}</div>
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold">
          {prefix}{animatedValue.toLocaleString()}{suffix}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;