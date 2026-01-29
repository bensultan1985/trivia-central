"use client";

import Link from "next/link";
import { type ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import {
  IconBook,
  IconDashboard,
  IconGameBuilder,
  IconHostGame,
  IconStrategyGuides,
  IconStudyGuides,
  IconTarget,
} from "@/components/icons";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  const navItems: Array<
    | { type: "header"; label: string }
    | {
        type: "link";
        href: string;
        label: string;
        icon: ReactNode;
        requireAuth?: boolean;
      }
  > = [
    {
      type: "link",
      href: "/dashboard",
      label: "Dashboard",
      icon: <IconDashboard />,
    },
    { type: "header", label: "Contestant" },
    // { href: "/", label: "Home", icon: <IconHome /> },
    {
      type: "link",
      href: "/training/target-practice",
      label: "Target Practice",
      icon: <IconTarget />,
    },
    {
      type: "link",
      href: "/strategy-guides",
      label: "Strategy Guides",
      icon: <IconStrategyGuides />,
    },
    {
      type: "link",
      href: "/study-guides",
      label: "Study Guides",
      icon: <IconStudyGuides />,
    },
    // { href: "/training/speed", label: "Speed Training", icon: <IconBolt /> },
    // {
    //   href: "/training/accuracy",
    //   label: "Accuracy Training",
    //   icon: <IconCheck />,
    // },
    // {
    //   href: "/training/category",
    //   label: "Category Training",
    //   icon: <IconGrid />,
    // },
    {
      type: "link",
      href: "/history",
      label: "Question History",
      icon: <IconBook />,
      requireAuth: true,
    },
    { type: "header", label: "Host" },
    {
      type: "link",
      href: "/host-game",
      label: "Host Game",
      icon: <IconHostGame />,
    },
    {
      type: "link",
      href: "/game-builder",
      label: "Game Builder",
      icon: <IconGameBuilder />,
    },
  ];

  const isHostHref = (href: string) =>
    href === "/host-game" || href === "/game-builder";

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
              {isCollapsed ? "TC" : "Trivia Central"}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems
                .filter((item) => {
                  // Filter out items that require authentication if user is not signed in
                  if (item.type === "link" && item.requireAuth) {
                    return isLoaded && isSignedIn;
                  }
                  return true;
                })
                .map((item) => (
                  <li
                    key={
                      item.type === "header"
                        ? `header:${item.label}`
                        : item.href
                    }
                  >
                    {item.type === "header" ? (
                      isCollapsed ? null : (
                        <div
                          className={`px-3 pt-2
                          mb-3 text-xs font-semibold uppercase tracking-wide ${
                            item.label === "Host"
                              ? "text-orange-400"
                              : item.label === "Contestant"
                                ? "text-blue-500"
                                : "text-gray-500"
                          }`}
                        >
                          {item.label}
                        </div>
                      )
                    ) : (
                      <Link
                        href={item.href}
                        aria-label={item.label}
                        className={`
                      flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${
                        pathname === item.href
                          ? isHostHref(item.href)
                            ? "bg-orange-400 text-white shadow ring-1 ring-orange-900/20"
                            : "bg-blue-500 text-white shadow ring-1 ring-blue-900/20"
                          : isHostHref(item.href)
                            ? "hover:bg-orange-200 hover:text-white text-black/80"
                            : "hover:bg-blue-300 hover:text-white text-black/80"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    )}
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
