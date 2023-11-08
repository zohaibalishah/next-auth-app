import React from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const Layout = ({children}) => {
  return (
    <>
      <Head></Head>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
