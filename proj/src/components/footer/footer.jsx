import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo';

function Footer() {
  // Reusable function to render a section of links
  const renderLinks = (title, links) => (
    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
      <div className="h-full">
        <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
          {title}
        </h3>
        <ul>
          {links.map((link, index) => (
            <li key={index} className="mb-2">
              <Link
                to={link.to}
                className="text-sm font-medium text-gray-900 hover:text-gray-700"
                aria-label={link.name}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Data for the footer sections
  const sections = [
    {
      title: 'Company',
      links: [
        { name: 'Features', to: '/' },
        { name: 'Pricing', to: '/' },
        { name: 'Affiliate Program', to: '/' },
        { name: 'Press Kit', to: '/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Account', to: '/' },
        {name: 'Help', to: '/' },
        { name: 'Contact Us', to: '/' },
        { name: 'Customer Support', to: '/' },
      ],
    },
    {
      title: 'Legals',
      links: [
        { name: 'Terms & Conditions', to: '/' },
        { name: 'Privacy Policy', to: '/' },
        { name: 'Licensing', to: '/' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-400 border-t-2 border-t-black py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Left Section: Logo and Copyright */}
          <div className="w-full p-4 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <div className='w-40'>
                <Logo width="100px" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; {new Date().getFullYear()} All Rights Reserved Hmz_Akt
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {sections.map((section, index) => renderLinks(section.title, section.links))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;