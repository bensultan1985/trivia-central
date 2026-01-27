"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/training/target-practice", label: "Target Practice", icon: "🎯" },
    { href: "/training/speed", label: "Speed Training", icon: "⚡" },
    { href: "/training/accuracy", label: "Accuracy Training", icon: "✓" },
    { href: "/training/category", label: "Category Training", icon: "📚" },
    { href: "/history", label: "Question History", icon: "📖" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 rounded-md bg-blue-700 p-2 text-white shadow-lg ring-1 ring-blue-900/10"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white text-white transition-all duration-300 z-40
          ${isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0 w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-4 border-b border-white/10">
            <div
              className={`font-bold text-xl ${isCollapsed ? "text-center" : ""}`}
            >
              {isCollapsed ? "TT" : "Trivia Train"}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${
                        pathname === item.href
                          ? "bg-blue-500 text-white shadow ring-1 ring-blue-900/20"
                          : "hover:bg-blue-300 hover:text-white text-black/80"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Toggle button for desktop */}
          <div className="p-4 border-t border-white/10 hidden lg:block">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full rounded-lg p-2 transition-colors hover:bg-white/5"
              aria-label="Toggle sidebar"
            >
              <svg
                className={`w-6 h-6 mx-auto transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
