'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Layout from '@/components/layout/Layout';
import { SIGNUP_API } from '@/utils/constant';
import { toast } from 'react-hot-toast';
export default function signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(SIGNUP_API, {
        name,
        email,
        password,
      });
      if (response.data) {
        toast.success(response.data.message);
      }
      setLoading(false);
      router.push('/login');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Something wrong');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="d-flex flex-column justify-content-center min-vh-80 px-2 mt-5 ">
        <form className="col-sm-12 col-md-6 offset-md-3">
          <h2>Signup </h2>
          {loading && <p>Loading...</p>}

          <div className="form-group mt-3 ">
            <label htmlFor="exampleInputName">Name </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Full Name"
            />
          </div>
          <div className="form-group  mt-3">
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
          <div className="form-group  mt-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button
            onClick={onLogin}
            type="button"
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
