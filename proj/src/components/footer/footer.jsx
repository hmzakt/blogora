import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo';

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t-2 border-t-black py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Left Section: Logo and Copyright */}
          <div className="w-full md:w-auto p-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <div className="w-20">
                  <Logo width="20px" />
                </div>
              </div>
              <p className="text-sm text-gray-400 text-center md:text-left">
                &copy; {new Date().getFullYear()} All Rights Reserved Hmz_Akt
              </p>
            </div>
          </div>

         
          <div className="w-full md:w-auto p-1 pr-8 md:pr-12 lg:pr-16">
            <div className="flex flex-col items-center">
            
              <div className="text-gray-400 mb-4 text-center">
                Contact Us
              </div>
            
              <div className="flex justify-center">
                <button onClick={() => window.open('mailto:hmzakt11@gmail.com', '_blank')}>
                  <img className="h-12 w-12" src='/svgs/email.svg' alt='Email Icon' />
                </button>
                <button onClick={() => window.open('https://www.instagram.com/hmz_akt/', '_blank')}>
                  <img className="h-12 w-12 ml-4" src='./svgs/insta.svg' alt='Instagram Icon' />
                </button>
                <button onClick={() => window.open('https://www.linkedin.com/in/hmzakt', '_blank')}>
                  <img className="h-12 w-12 ml-4" src='./svgs/linkedin.svg' alt='LinkedIn Icon' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;