import { getToken } from '../utils/storage';

export const getProducts = async () => {
  const token = await getToken();

  const res = await fetch('http://192.168.50.106:3000/api/mobile/workspace', {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  return res.json();
};