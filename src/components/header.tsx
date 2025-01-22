"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
} from "react-icons/fi"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/product?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-[#252B42] py-4 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center text-white text-sm">
          {/* Contact Information */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FiPhone />
              <p>(923) 238-293672</p>
            </div>
            <div className="flex items-center gap-1">
              <FiMail />
              <p>m128waheed@gmail.com</p>
            </div>
          </div>

          {/* Promotion */}
          <p className="hidden md:block">Follow Us and get a chance to win 80% off</p>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <p className="hidden md:block">Follow Us:</p>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </Link>
            <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FiYoutube />
            </Link>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </Link>
            <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar Section */}
      <div className="bg-white shadow-md border-b-2 border-[#E5E5E5] relative z-40">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#252B42]">OutfitPlus</div>

          {/* Action Icons (Mobile and Desktop) */}
          <div className="flex items-center gap-4 md:hidden">
            <FiSearch
              className="text-2xl text-[#252B42] cursor-pointer"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <FiShoppingCart className="text-2xl text-[#252B42] cursor-pointer" />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? (
                <FiX className="text-3xl text-[#252B42]" />
              ) : (
                <FiMenu className="text-3xl text-[#252B42]" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex">
            <ul className="flex gap-8 text-sm font-medium text-[#737373] relative">
              <li>
                <Link href="/" className="hover:text-[#23A6F0] transition-all">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link href="/product" className="flex items-center gap-1 hover:text-[#23A6F0] transition-all">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#23A6F0] transition-all">
                  About
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-[#23A6F0] transition-all">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#23A6F0] transition-all">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pages" className="hover:text-[#23A6F0] transition-all">
                  Team
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action Icons for Desktop */}
          <div className="hidden md:flex items-center gap-6 text-[#23A6F0]">
            <button className="text-sm font-medium">Login/Register</button>
            <FiSearch className="text-lg cursor-pointer" onClick={() => setIsSearchOpen(!isSearchOpen)} />
            <FiShoppingCart className="text-lg cursor-pointer" />
            <Link href="/wishlist">
              <FiHeart className="text-lg cursor-pointer" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden bg-white shadow-md transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col gap-6 p-4 text-[20px] text-[#737373] text-center">
            <li>
              <Link href="/" className="hover:text-[#23A6F0] transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link href="/product" className="hover:text-[#23A6F0] transition-all">
                Product
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#23A6F0] transition-all">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#23A6F0] transition-all">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4">
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
    </div>
  )
}

export default Header

