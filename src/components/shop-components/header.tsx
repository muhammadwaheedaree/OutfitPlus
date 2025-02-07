"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiYoutube,
  FiFacebook,
  FiTwitter,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";
import Cart from "@/components/cart";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a
              href="tel:+923238293672"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <FiPhone size={14} />
              <span>(923) 238-293672</span>
            </a>
            <a
              href="mailto:m128waheed@gmail.com"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <FiMail size={14} />
              <span>m128waheed@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow Us:</span>
            <a href="#" className="hover:text-gray-300">
              <FiInstagram size={14} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FiYoutube size={14} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FiFacebook size={14} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FiTwitter size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            OutfitPlus
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/product" className="text-gray-600 hover:text-gray-900">
              Shop
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="#blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="/pages" className="text-gray-600 hover:text-gray-900">
              Team
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FiSearch size={20} />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                <FiShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
            <Link
              href="/wishlist"
              className="text-gray-600 hover:text-gray-900"
            >
              <FiHeart size={20} />
            </Link>
            {user ? (
              <div className="relative group">
                <button className="text-gray-600 hover:text-gray-900">
                  <FiUser size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth" className="text-gray-600 hover:text-gray-900">
                <FiUser size={20} />
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/product"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="#blog"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              href="/pages"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Team
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Pricing
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 text-gray-600 hover:text-gray-900"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="block py-2 text-gray-600 hover:text-gray-900"
              >
                Login / Sign Up
              </Link>
            )}
          </nav>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
