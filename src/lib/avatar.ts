import { AVATAR_GRADIENTS } from '@/constants/gradients';

export const getGradientFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
};

export const getInitials = (firstName: string, lastName: string): string => {
  return (firstName[0] + lastName[0]).toUpperCase();
};