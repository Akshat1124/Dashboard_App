import React from 'react';

interface AvatarProps {
  name: string;
  className?: string;
}

const getInitials = (name: string): string => {
  if (!name) return '?';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const COLORS = ['#6366f1', '#ec4899', '#22c55e', '#f97316', '#06b6d4', '#eab308'];

const getColorFromName = (name: string): string => {
  if (!name) return COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % COLORS.length);
  return COLORS[index];
};

const Avatar: React.FC<AvatarProps> = ({ name, className = '' }) => {
  const initials = getInitials(name);
  const backgroundColor = getColorFromName(name);

  return (
    <div className={`flex items-center justify-center rounded-full ${className}`} style={{ backgroundColor }}>
      <span className="text-white font-bold text-sm">{initials}</span>
    </div>
  );
};

export default Avatar;