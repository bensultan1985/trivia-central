"use client";

import Link from "next/link";
import { type ReactNode } from "react";
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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
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
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white text-gray-900 transition-all duration-300 dark:bg-slate-950 dark:text-slate-100
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-4">
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
                                ? "text-blue-500 dark:text-indigo-300"
                                : "text-gray-500"
                          }`}
                        >
                          {item.label}
                        </div>
                      )
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => onClose()}
                        aria-label={item.label}
                        className={`
                      flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${
                        pathname === item.href
                          ? isHostHref(item.href)
                            ? "bg-orange-400 text-white shadow ring-1 ring-orange-900/20"
                            : "bg-blue-500 text-white shadow ring-1 ring-blue-900/20"
                          : isHostHref(item.href)
                            ? "text-black/80 hover:bg-orange-200 hover:text-white dark:text-orange-100/90 dark:hover:bg-orange-500/20"
                            : "text-black/80 hover:bg-blue-300 hover:text-white dark:text-slate-200 dark:hover:bg-indigo-950 dark:hover:text-indigo-100"
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
          <div className="hidden p-4 lg:block">
            <button
              onClick={onToggleCollapse}
              className="flex w-full justify-start rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Toggle sidebar"
            >
              <svg
                className={`h-6 w-6 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                fill="none"
                stroke="#D4D4D4"
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
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 transition-opacity duration-300 z-30"
          onClick={onClose}
        />
      )}
    </>
  );
}
