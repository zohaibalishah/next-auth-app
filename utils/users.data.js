export const users = [
  { id: 1, name: 'John Doe', email: 'admin@gmail.com', password: '123456' },
  { id: 2, name: 'Jane Smith', email: 'user@gmail.com', password: '123456' },
  {
    id: 3,
    name: 'zohaib ali shah',
    email: 'zohaib@gmail.com',
    password: '123456',
  },
];

export const findUserByEmailAndPassword = (email, password) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};
export const getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

export const addUser = (name, email, password) => {
  const id = users.length + 1;
  const newUser = { id, name, email, password };
  users.push(newUser);
};
