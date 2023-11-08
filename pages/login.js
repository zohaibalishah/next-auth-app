import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';
import { toast } from 'react-hot-toast';
export default function LoginPage() {
  const [email, setEmail] = useState('zohaib@gmail.com');
  const [password, setPassword] = useState('123456');
  const { data: session, status } = useSession();

  if (session) {
    Router.replace('/');
    return null;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: '/',
      });

      if (result.status == 200) {
        console.log('result', result);
        toast.success('login successful');
        Router.replace('/');
      } else {
        toast.error(result?.error);
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <div className="d-flex flex-column justify-content-center min-vh-80 px-2 mt-5 ">
        <form onSubmit={onSubmit} className="col-sm-12 col-md-6 offset-md-3">
          <h2>Login </h2>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3 ">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control "
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}
