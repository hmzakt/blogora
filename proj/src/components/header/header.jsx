import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All posts', slug: '/all-posts', active: authStatus },
    { name: 'Add post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="py-2 shadow bg-[#1a1a1a] w-full">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <div className='w-20'>
                <Logo className="w-15 md:w-25" />
              </div>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-400 p-2" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✖' : '☰'}
          </button>
        
          <ul 
            className={`md:flex md:ml-auto md:static absolute left-0 top-20 bg-[#1a1a1a] w-full md:w-auto md:bg-transparent md:space-x-4 hover:text-white 
              ${isOpen ? 'block' : 'hidden'} md:flex`}
            style={{ zIndex: isOpen ? 1000 : 0 }} // Add z-index here
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="text-center md:inline-block">
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false);
                    }}
                    className="inline-block px-6 py-2 duration-200 text-gray-400 hover:bg-blue-100 rounded-full hover:text-black"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="text-center md:inline-block">
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
