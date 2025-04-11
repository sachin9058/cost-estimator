"use client";
import { motion } from "framer-motion";
import Link from "next/link";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 text-gray-800 font-sans relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 ">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Construction Cost Estimator
        </motion.h1>
        <motion.p
          className="mt-6 text-lg sm:text-xl max-w-2xl text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Estimate project costs quickly and accurately. Save time, reduce
          errors, and get cost-saving recommendations with ease.
        </motion.p>
        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/estimator"
            className="rounded-full px-6 py-3 bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="rounded-full px-6 py-3 border-2 border-orange-400 text-orange-600 font-semibold shadow hover:bg-orange-100 transition-transform transform hover:scale-105"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-0 w-72 h-72 bg-yellow-300 opacity-30 rounded-full blur-2xl animate-pulse" />
      </div>

      <section
        id="features"
        className="relative z-10 py-8 px-6 max-w-5xl mx-auto"
      >
        <motion.h2
          className="text-4xl font-bold text-center text-orange-700 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Use Our Estimator?
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Accurate Costing",
              description:
                "Get instant, accurate cost calculations using real-world data and civil engineering principles.",
            },
            {
              title: "Smart Optimizations",
              description:
                "Receive recommendations for more cost-effective materials and design tweaks.",
            },
            {
              title: "Interactive Dashboard",
              description:
                "View breakdowns of materials, labor, and overhead with rich charts and insights.",
            },
            {
              title: "PDF Reports",
              description:
                "Export detailed summaries and reports for clients, approvals, or future reference.",
            },
            {
              title: "Responsive Design",
              description:
                "Use the tool easily on desktops, tablets, or mobile devices with a smooth UI.",
            },
            {
              title: "Secure & Scalable",
              description:
                "Built on a solid backend with scalable architecture and optional authentication.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
