import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <NavLink to="/" className="text-white text-lg font-semibold">
                    Your Logo
                </NavLink>

                {/* Navbar links (hidden on mobile) */}
                <div className="hidden md:flex space-x-4">
                    <NavLink to="/" className="text-white">
                        Read
                    </NavLink>
                    <NavLink to="/Create" className="text-white">
                        Create
                    </NavLink>
                    <NavLink to="/Update" className="text-white">
                        Update
                    </NavLink>
                    <NavLink to="/Delete" className="text-white">
                        Delete
                    </NavLink>
                </div>

                {/* Hamburger menu icon (visible on mobile) */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu (hidden by default) */}
            <div
                className={`md:hidden bg-blue-500 p-4 ${isMobileMenuOpen ? 'block' : 'hidden'
                    }`}
            >
                <NavLink to="/" className="block text-white mb-2">
                    Read
                </NavLink>
                <NavLink to="/Create" className="block text-white mb-2">
                    Create
                </NavLink>
                <NavLink to="/Update" className="block text-white mb-2">
                    Update
                </NavLink>
                <NavLink to="/Delete" className="block text-white mb-2">
                    Delete
                </NavLink>

            </div>
        </nav>
    );
};

export default Navbar;
