import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { AppContextType, Theme, User, Post } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockIndianUsers: User[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    username: 'aarav.sharma',
    email: 'aarav.sharma@example.com',
    address: { street: '123 MG Road', suite: 'Apt 4B', city: 'Bengaluru', zipcode: '560001', geo: { lat: '12.9716', lng: '77.5946' } },
    phone: '+91 98765 43210',
    website: 'aaravsharma.in',
    company: { name: 'Innovate India', catchPhrase: 'Digital solutions for a new era', bs: 'e-commerce platforms' }
  },
  {
    id: 2,
    name: 'Sanya Verma',
    username: 'sanya.verma',
    email: 'sanya.verma@example.com',
    address: { street: '456 Marine Drive', suite: 'Floor 10', city: 'Mumbai', zipcode: '400020', geo: { lat: '19.0760', lng: '72.8777' } },
    phone: '+91 91234 56789',
    website: 'sanyaverma.dev',
    company: { name: 'Mumbai Techies', catchPhrase: 'Building the future of finance', bs: 'fintech solutions' }
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    username: 'rohan.mehta',
    email: 'rohan.mehta@example.com',
    address: { street: '789 Cyber City', suite: 'Tower C', city: 'Gurugram', zipcode: '122002', geo: { lat: '28.4595', lng: '77.0266' } },
    phone: '+91 87654 32109',
    website: 'rohanmehta.org',
    company: { name: 'Gurugram Analytics', catchPhrase: 'Data-driven insights', bs: 'big data consulting' }
  },
  {
    id: 4,
    name: 'Isha Singh',
    username: 'isha.singh',
    email: 'isha.singh@example.com',
    address: { street: '101 HITEC City', suite: 'Phase 2', city: 'Hyderabad', zipcode: '500081', geo: { lat: '17.4483', lng: '78.3915' } },
    phone: '+91 76543 21098',
    website: 'ishasingh.net',
    company: { name: 'Deccan Software', catchPhrase: 'Innovative software solutions', bs: 'enterprise software' }
  },
  {
    id: 5,
    name: 'Vikram Reddy',
    username: 'vikram.reddy',
    email: 'vikram.reddy@example.com',
    address: { street: '212 Tidel Park', suite: 'Unit 5', city: 'Chennai', zipcode: '600113', geo: { lat: '12.9905', lng: '80.2436' } },
    phone: '+91 65432 10987',
    website: 'vikramreddy.co',
    company: { name: 'Chennai Coders', catchPhrase: 'Crafting quality code', bs: 'custom app development' }
  },
  {
    id: 6,
    name: 'Ananya Joshi',
    username: 'ananya.joshi',
    email: 'ananya.joshi@example.com',
    address: { street: '333 Magarpatta', suite: 'Cybercity', city: 'Pune', zipcode: '411028', geo: { lat: '18.5196', lng: '73.9317' } },
    phone: '+91 88877 55443',
    website: 'ananyajoshi.info',
    company: { name: 'Pune IT Hub', catchPhrase: 'Your partner in technology', bs: 'IT infrastructure services' }
  },
  {
    id: 7,
    name: 'Aditya Kumar',
    username: 'aditya.kumar',
    email: 'aditya.kumar@example.com',
    address: { street: '444 Salt Lake', suite: 'Sector V', city: 'Kolkata', zipcode: '700091', geo: { lat: '22.5726', lng: '88.3639' } },
    phone: '+91 77766 55443',
    website: 'adityakumar.biz',
    company: { name: 'Bengal Technologies', catchPhrase: 'East India\'s tech leader', bs: 'cloud computing services' }
  },
  {
    id: 8,
    name: 'Diya Gupta',
    username: 'diya.gupta',
    email: 'diya.gupta@example.com',
    address: { street: '555 Infopark', suite: 'Phase 1', city: 'Kochi', zipcode: '682030', geo: { lat: '10.0089', lng: '76.3458' } },
    phone: '+91 66655 44332',
    website: 'diyagupta.io',
    company: { name: 'Kerala Innovations', catchPhrase: 'Ideas to reality', bs: 'startup incubation' }
  },
  {
    id: 9,
    name: 'Kabir Khan',
    username: 'kabir.khan',
    email: 'kabir.khan@example.com',
    address: { street: '666 E-City', suite: 'Hosur Road', city: 'Bengaluru', zipcode: '560100', geo: { lat: '12.8452', lng: '77.6602' } },
    phone: '+91 98765 12345',
    website: 'kabirkhan.com',
    company: { name: 'Future Forward', catchPhrase: 'Pioneering tomorrow\'s tech', bs: 'AI and ML research' }
  },
  {
    id: 10,
    name: 'Priya Patel',
    username: 'priya.patel',
    email: 'priya.patel@example.com',
    address: { street: '789 Connaught Place', suite: 'Office 301', city: 'New Delhi', zipcode: '110001', geo: { lat: '28.6330', lng: '77.2193' } },
    phone: '+91 99887 76655',
    website: 'priyapatel.io',
    company: { name: 'Delhi Digital', catchPhrase: 'Marketing that matters', bs: 'seo and content strategy' }
  },
];


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('user'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Swapped remote user fetch for local mock data
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        const postsData = await postsResponse.json();
        setUsers(mockIndianUsers);
        setPosts(postsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    if(isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };
  
  const updateUser = (updatedUserData: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUserData };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };


  return (
    <AppContext.Provider value={{ theme, toggleTheme, isLoggedIn, login, logout, user, updateUser, users, posts, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};