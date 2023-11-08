import { addUser, getUserByEmail } from '@/utils/users.data';

export default async function signup(request, response) {
  const { method } = request;
  switch (method) {
    case 'POST':
      const { name, email, password } = request.body;
      if (!name || !email || !password) {
        response.status(400).json({ error: 'All fields are required' });
      }
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        response.status(400).json({ error: 'Email already exists' });
      }
      addUser(name, email, password);
      response.status(200).json({ message: 'User signup successfully' });
      break;
    default:
      response.setHeader('Allow', ['POST']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}
