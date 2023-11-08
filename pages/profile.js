import React from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession, signOut } from 'next-auth/react';
import Layout from '@/components/layout/Layout';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
    return { props: {} };
  }
  return { props: { session } };
}

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/login');
    return null;
  }
 
  return (
    <Layout>
      <div className="col-md-12 ">
        <div className="container">
          <h1>Profile Page</h1>
          {session && session.user.name && (
            <>
              <p>Name: {session.user.name}</p>
              <p>Email: {session.user.email}</p>
              <p>ID: {session.user.id}</p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
