import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-orange-50 border-t border-orange-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-orange-600">
            BuildWise<span className="text-yellow-500">.</span>
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            Empowering civil engineers with accurate cost estimation and smarter planning tools.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4 text-orange-500">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-orange-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/estimator" className="hover:text-orange-600 transition">
                Estimator
              </Link>
            </li>
            <li>
              <Link href="#features" className="hover:text-orange-600 transition">
                Features
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>


        <div>
          <h3 className="text-md font-semibold mb-4 text-orange-500">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                Blog (coming soon)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                Case Studies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>


        <div>
          <h3 className="text-md font-semibold mb-4 text-orange-500">Stay in Touch</h3>
          <p className="text-sm mb-4">Get updates on new features and tips.</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md border border-orange-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-md px-4 py-2 hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

  
      <div className="border-t border-orange-200 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BuildWise. All rights reserved.
      </div>
    </footer>
  );
};
