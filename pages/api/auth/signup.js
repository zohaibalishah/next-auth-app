import { addUser, getUserByEmail } from '@/utils/users.data';
import { databaseConnection } from '@/config/dbConfig';
import User from '@/models/user.model';
import bcryptjs from 'bcryptjs';

databaseConnection();
export default async function signup(request, response) {
  const { method } = request;
  switch (method) {
    case 'POST':
      const { name, email, password } = request.body;
      if (!name || !email || !password) {
        response.status(400).json({ error: 'All fields are required' });
      }
      const user = await User.findOne({ email });
      if (user) {
        response.status(400).json({ error: 'Email already exists' });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const result = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      response
        .status(200)
        .json({ message: 'User signup successfully', result });
      break;
    default:
      response.setHeader('Allow', ['POST']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}
