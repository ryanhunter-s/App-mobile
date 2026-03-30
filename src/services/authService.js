export const login = async (email, password) => {
  const res = await fetch('http://192.168.50.106:3000/api/mobile/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};