import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import UserTable from '../components/UserTable';
import { Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

const lineChartData = [
  { name: 'Jan', revenue: 4000, },
  { name: 'Feb', revenue: 3000, },
  { name: 'Mar', revenue: 5000, },
  { name: 'Apr', revenue: 4500, },
  { name: 'May', revenue: 6000, },
  { name: 'Jun', revenue: 5500, },
];

const pieChartData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
  { name: 'Other', value: 100 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: React.FC = () => {
  const { user, users, loading, theme } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  const renderStatCards = () => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, index) => (
        <LoadingSkeleton key={index} className="h-32"/>
      ));
    }
    return (
      <>
        <StatCard title="Total Users" value={users.length} icon={<Users />} color="text-blue-500" />
        <StatCard title="Revenue" value={24500} icon={<DollarSign />} prefix="$" color="text-green-500" />
        <StatCard title="Orders" value={1204} icon={<ShoppingCart />} color="text-yellow-500" />
        <StatCard title="Activity" value={85.6} icon={<Activity />} suffix="%" color="text-red-500" />
      </>
    );
  }

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
        Welcome back, {user?.name}!
      </motion.h1>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatCards()}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-light-card dark:bg-dark-card rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-glow-secondary">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          {loading ? <LoadingSkeleton className="h-80"/> : (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="p-6 bg-light-card dark:bg-dark-card rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-glow-secondary">
          <h2 className="text-xl font-semibold mb-4">Traffic Source</h2>
          {loading ? <LoadingSkeleton className="h-80"/> : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                  {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle}/>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <UserTable />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;