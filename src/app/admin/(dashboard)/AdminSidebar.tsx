"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coffee,
  LayoutDashboard,
  Users,
  Newspaper,
  BookOpen,
  Beaker,
  TrendingUp,
  Mail,
  Bell,
  LogOut,
  ChevronLeft,
  Menu,
  Handshake,
  UserCog,
  Phone,
  Target,
  Home,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { label: "Dashboard",   href: "/admin/dashboard",   icon: LayoutDashboard },
  { label: "Home Page",   href: "/admin/home",        icon: Home },
  { label: "The Project",   href: "/admin/project",      icon: Target },
  { label: "Research",     href: "/admin/research",     icon: Beaker },
  { label: "Team",          href: "/admin/team",            icon: Users },
  { label: "Coordinators",   href: "/admin/collaborations",  icon: Handshake },
  { label: "News & Events", href: "/admin/news",            icon: Newspaper },
  { label: "Publications", href: "/admin/publications", icon: BookOpen },
  { label: "Impact",       href: "/admin/impact",       icon: TrendingUp },
  { label: "Messages",     href: "/admin/messages",     icon: Mail },
  { label: "Newsletter",   href: "/admin/newsletter",   icon: Bell },
  { label: "Partners",     href: "/admin/partners",     icon: Handshake },
  { label: "Contact Info", href: "/admin/contact",      icon: Phone },
];

export function AdminSidebar({
  user,
}: {
  user?: { name?: string | null; email?: string | null } | null;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsOpenMobile(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <div className="md:hidden fixed top-3 left-3 z-[60]">
        <button
          onClick={() => setIsOpenMobile((v) => !v)}
          className="p-2 rounded-lg bg-card border border-border text-foreground shadow-lg hover:bg-muted transition-colors flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="md:hidden fixed inset-0 z-[65] bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar (Fixed on Mobile, Relative on Desktop) */}
      <aside
        className={`fixed md:relative top-0 left-0 z-[70] h-[100dvh] flex flex-col bg-card border-r border-border transition-all duration-300 transform 
        ${isOpenMobile ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "md:w-16 w-64" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-border min-h-[72px]">
          <Image
            src="/assets/IMAGE_FOR_LOGO.jpg"
            alt="CARES Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover shadow-glow shrink-0"
          />
          {!collapsed && (
            <div className="min-w-0">
              <span className="font-serif font-bold text-sm leading-none block text-foreground truncate">
                CARES
              </span>
              <span className="text-xs text-leaf-bright tracking-widest uppercase">
                {user?.name ?? "Admin"}
              </span>
            </div>
          )}
          
          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden md:block ml-auto p-1 rounded text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard" || pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                  isActive
                    ? "bg-accent text-leaf-bright"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 shrink-0 ${isActive ? "text-leaf-bright" : "text-muted-foreground group-hover:text-foreground"}`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-border p-3">
          {!collapsed && user && (
            <div className="px-2 py-2 mb-2">
              <p className="text-xs font-medium text-foreground truncate">
                {user.name ?? "Admin"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          )}
          <Link
            href="/admin/profile"
            title={collapsed ? "Profile & Settings" : undefined}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <UserCog className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Profile &amp; Settings</span>}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            title={collapsed ? "Sign out" : undefined}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>

          {/* Back to site */}
          <Link
            href="/"
            title={collapsed ? "Back to site" : undefined}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors mt-0.5"
          >
            <Coffee className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Back to site</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
