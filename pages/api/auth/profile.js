import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { databaseConnection } from '@/config/dbConfig';
import User from '@/models/user.model';

databaseConnection();
export default async function profile(request, response) {
  const session = await getServerSession(request, response, authOptions);
  const { method } = request;
  switch (method) {
    case 'GET':
      if (session) {
        const profile = session.user;
        const user = await User.findById(profile.id).select('-password');
        response.status(200).json({ status: 1, profile });
      } else {
        response.json({
          status: 0,
          error: 'login is required',
        });
      }

      break;
    default:
      response.setHeader('Allow', ['GET']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}
