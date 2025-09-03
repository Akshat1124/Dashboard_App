import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import type { User } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import LoadingSkeleton from './LoadingSkeleton';

type SortKey = keyof User;
type SortOrder = 'asc' | 'desc';

const UserTable: React.FC = () => {
  const { users, loading } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder } | null>({ key: 'id', order: 'asc' });

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.order === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedUsers, searchTerm]);
  
  const requestSort = (key: SortKey) => {
    let order: SortOrder = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ key, order });
  };
  
  const renderLoadingRows = () => (
     Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
           <td className="py-3 px-4"><LoadingSkeleton className="h-5 w-10" /></td>
           <td className="py-3 px-4"><LoadingSkeleton className="h-5 w-32" /></td>
           <td className="py-3 px-4"><LoadingSkeleton className="h-5 w-40" /></td>
           <td className="py-3 px-4"><LoadingSkeleton className="h-5 w-24" /></td>
        </tr>
     ))
  );

  return (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-glow-secondary">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('id')}><span className='flex items-center'>ID <ArrowUpDown className="ml-2 h-4 w-4"/></span></th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('name')}><span className='flex items-center'>Name <ArrowUpDown className="ml-2 h-4 w-4"/></span></th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('email')}><span className='flex items-center'>Email <ArrowUpDown className="ml-2 h-4 w-4"/></span></th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('website')}><span className='flex items-center'>Website <ArrowUpDown className="ml-2 h-4 w-4"/></span></th>
            </tr>
          </thead>
          <motion.tbody>
            <AnimatePresence>
              {loading ? renderLoadingRows() : filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 text-indigo-500 dark:text-indigo-400">{user.website}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;