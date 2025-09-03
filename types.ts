export type Theme = 'light' | 'dark';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
  updateUser: (updatedUserData: Partial<User>) => void;
  users: User[];
  posts: Post[];
  loading: boolean;
}