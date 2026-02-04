"use client";

import SalaryWizard from "../components/SalaryWizard";
import { Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            CheckSalary
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-slate-900 transition-colors">
            Calculator
          </a>
          <a href="#" className="hover:text-slate-900 transition-colors">
            Admin Settings
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center gap-10">
        {/* Hero Text */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Net Salary
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Choose your contract type, enter your gross amount, and instantly
            see what you'll take home. No stress, just clarity.
          </p>
        </div>

        {/* Wizard Component */}
        <SalaryWizard />

        {/* Recent Checks (Mock) */}
        <div className="w-full max-w-2xl mt-8 space-y-6 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-xs tracking-wider">
            <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500">
              3
            </span>
            Recent Checks
            <span className="ml-auto text-green-600 text-[10px] cursor-pointer hover:underline">
              Load More
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                type: "UoP",
                time: "Feb 5, 2026 10:23 am",
                gross: "12500",
                net: "8875",
              },
              {
                type: "B2B",
                time: "Feb 5, 2026 9:15 am",
                gross: "18000",
                net: "13840",
              },
              {
                type: "UZ",
                time: "Feb 5, 2026 8:45 am",
                gross: "6500",
                net: "4875",
              },
            ].map((check, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                    {check.type}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{check.time}</p>
                    <p className="text-xs font-medium text-slate-500">
                      Gross {check.gross} PLN
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">{check.net} PLN</p>
                  <p className="text-[10px] text-slate-300">Net result</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 mt-auto bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center text-white">
                <Wallet className="w-3 h-3" />
              </div>
              <span className="font-bold text-lg text-slate-900">
                CheckSalary
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Your trusted salary calculator for modern contractors. Clean,
              fast, and reliable.
            </p>
            <p className="text-xs text-slate-400 mt-4">
              © {new Date().getFullYear()} CheckSalary. All rights reserved.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 text-sm">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-green-600">
                  Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Admin Settings
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 text-sm">
              Information
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-green-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 text-sm">Support Me</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a
                  href="https://rejestracja.maratonwarszawski.com/pl/fundraising/78340dd5-a8e8-4540-8852-2222942ed145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 flex items-center gap-1"
                >
                  Marathon Fundraising
                </a>
              </li>
              <li>
                <a
                  href="https://buycoffee.to/potnar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 flex items-center gap-1"
                >
                  Buy Coffee for Potnar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
