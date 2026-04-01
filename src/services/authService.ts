export const login = async (values: {email: string, password: string}) => {
  const res = await fetch('http://192.168.50.106:3000/api/mobile/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  return res.json();
};