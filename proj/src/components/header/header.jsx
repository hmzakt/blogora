import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // Fetch auth status
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Navigation items array
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus, // Only show when not authenticated
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus, // Only show when not authenticated
    },
    {
      name: 'All posts',
      slug: '/all-posts',
      active: authStatus, // Only show when authenticated
    },
    {
      name: 'Add post',
      slug: '/add-post',
      active: authStatus, // Only show when authenticated
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          {/* Logo */}
          <div className="mr-4">
            <Link to="/">
            <div className='w-20'>
              <Logo className=" w-15 md:w-25"/>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)} // Navigate to the page
                    className="px-4 py-2 text-white hover:bg-gray-700 rounded"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
