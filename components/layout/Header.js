import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
export default function Header() {
  const { data: session, status } = useSession();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!session ? (
            <>
              <Link href="/login" passHref style={{ marginRight: '10px' }}>
                Login
              </Link>
              <Link href="/signup" passHref style={{ marginRight: '10px' }}>
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link href="/" style={{ marginRight: '10px' }}>Dashboard</Link>
              <Link href="/profile" style={{ marginRight: '10px' }}>Profile</Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
