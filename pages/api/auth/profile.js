import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function profile(request, response) {
  const session = await getServerSession(request, response, authOptions);
  const { method } = request;
  switch (method) {
    case 'GET':
      if (session) {
        const profile = session.user;
        response.status(200).json({ status: 1, profile });
      } else {
        response.json({
          status: 0,
          error:
            'You must be signed in to view the protected content on this page.',
        });
      }

      break;
    default:
      response.setHeader('Allow', ['POST']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}

