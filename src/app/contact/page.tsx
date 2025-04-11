"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for reaching out! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center px-6 py-20">
      <div className="bg-white shadow-2xl border border-orange-200 rounded-3xl max-w-3xl w-full p-10">
        <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-center">
          Have questions or feedback? We&apos;d love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-orange-300 px-4 py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-orange-300 px-4 py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-orange-300 px-4 py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-32 resize-none"
              required
              placeholder="Let us know how we can help you..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg transition-all font-medium"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Social Icons */}
        <div className="mt-10 border-t pt-6 text-center">
          <p className="text-gray-500 mb-3">Follow us on</p>
          <div className="flex justify-center space-x-6 text-orange-600 text-2xl">
            <a
              href="https://www.instagram.com/itz_5achin/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/sachin-kumar-9b9439312/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/sachin9058"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
