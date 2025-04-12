"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile nav when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm transition-all">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-orange-600 tracking-wide"
        >
          BuildWise<span className="text-yellow-500">.</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-orange-600 transition-colors duration-200">
            Home
          </Link>
          <Link href="/estimator" className="hover:text-orange-600 transition-colors duration-200">
            Estimator
          </Link>
          <Link href="/" className="hover:text-orange-600 transition-colors duration-200">
            Features
          </Link>
          <Link href="/contact" className="hover:text-orange-600 transition-colors duration-200">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            {!isSignedIn ? (
              <button
                onClick={() => openSignIn()}
                className="px-4 py-2 text-orange-500 border border-orange-400 rounded-full hover:bg-orange-100 transition"
              >
                Login
              </button>
            ) : (
              <UserButton />
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/estimator"
              className="px-5 py-2 rounded-full bg-orange-500 text-white font-medium shadow-md hover:bg-orange-600 transition"
            >
              Estimate Now
            </Link>
          </motion.div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          {!isSignedIn ? (
            <button
              onClick={() => {
                openSignIn();
                setOpen(false);
              }}
              className="text-orange-500 border border-orange-400 rounded-full px-4 py-2 hover:bg-orange-100 transition"
            >
              Login
            </button>
          ) : (
            <UserButton />
          )}
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={mobileMenuRef}
          className="md:hidden px-6 pb-4 bg-white border-t border-orange-100"
        >
          <nav className="flex flex-col gap-4 text-sm font-medium text-gray-700">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/estimator" onClick={() => setOpen(false)}>
              Estimator
            </Link>
            <Link href="#features" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link
              href="/estimator"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block px-4 py-2 bg-orange-500 text-white rounded-full text-center"
            >
              Estimate Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
