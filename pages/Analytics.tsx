import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import { Users, Eye, TrendingUp, MousePointerClick } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useAppContext } from '../context/AppContext';

const barChartData = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
];

const lineChartData = [
    { name: 'Jan', clicks: 1200 },
    { name: 'Feb', clicks: 2100 },
    { name: 'Mar', clicks: 1800 },
    { name: 'Apr', clicks: 2800 },
    { name: 'May', clicks: 2500 },
];

const Analytics: React.FC = () => {
    const { theme } = useAppContext();
    const loading = false; // Placeholder, can be tied to state

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
    
    const tooltipStyle = {
      backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
      borderColor: theme === 'light' ? '#e5e7eb' : '#374151',
      borderRadius: '0.75rem'
    };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-bold">
        Analytics Overview
      </motion.h1>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Unique Visitors" value={12500} icon={<Users />} color="text-teal-500" />
        <StatCard title="Page Views" value={450321} icon={<Eye />} color="text-sky-500" />
        <StatCard title="Bounce Rate" value={45.2} suffix="%" icon={<TrendingUp />} color="text-amber-500" />
        <StatCard title="Click-Through Rate" value={5.78} suffix="%" icon={<MousePointerClick />} color="text-violet-500" />
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-light-card dark:bg-dark-card rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Activity</h2>
          {loading ? <LoadingSkeleton className="h-80"/> : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="p-6 bg-light-card dark:bg-dark-card rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Click Trends</h2>
           {loading ? <LoadingSkeleton className="h-80"/> : (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="clicks" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
