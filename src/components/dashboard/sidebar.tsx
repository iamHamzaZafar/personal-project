"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/sidebar-context";
import {
  LayoutDashboard,
  User,
  Package,
  BarChart3,
  MapPin,
  Database,
  GraduationCap,
  Coins,
  FileText,
  Utensils,
  Wallet,
  Users,
  Ticket,
  ShoppingCart,
  Hospital,
  Kanban,
  Folder,
  Contact,
  Mail,
  MessageSquare,
  ShoppingBag,
  Calendar,
  Settings,
  Shield,
  CreditCard,
  Search,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Menu,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Your Account",
    icon: User,
    href: "/account",
  },
  {
    type: "section",
    label: "APPLICATIONS",
  },
  {
    label: "Logistics",
    icon: Package,
    href: "/dashboard/logistics",
    children: [
      { label: "Analytics", href: "/dashboard/logistics/analytics" },
      { label: "Tracking", href: "/dashboard/logistics/tracking" },
      { label: "Data", href: "/dashboard/logistics/data" },
    ],
  },
  {
    label: "Education",
    icon: GraduationCap,
    href: "/dashboard/education",
    badge: "NEW",
  },
  {
    label: "Cryptocurrency",
    icon: Coins,
    href: "/dashboard/cryptocurrency",
  },
  {
    label: "Invoicing",
    icon: FileText,
    href: "/dashboard/invoicing",
  },
  {
    label: "Restaurant",
    icon: Utensils,
    href: "/dashboard/restaurant",
  },
  {
    label: "Banking",
    icon: Wallet,
    href: "/dashboard/banking",
  },
  {
    label: "HR Management",
    icon: Users,
    href: "/dashboard/hr",
  },
  {
    label: "Ticketing",
    icon: Ticket,
    href: "/dashboard/ticketing",
  },
  {
    label: "Point of Sales",
    icon: ShoppingCart,
    href: "/dashboard/pos",
  },
  {
    label: "Hospital Management",
    icon: Hospital,
    href: "/dashboard/hospital",
  },
  {
    label: "Kanban",
    icon: Kanban,
    href: "/dashboard/kanban",
  },
  {
    label: "File Manager",
    icon: Folder,
    href: "/dashboard/files",
  },
  {
    label: "Contacts",
    icon: Contact,
    href: "/dashboard/contacts",
  },
  {
    label: "E-mail",
    icon: Mail,
    href: "/dashboard/email",
  },
  {
    label: "Messaging",
    icon: MessageSquare,
    href: "/dashboard/messaging",
  },
  {
    label: "E-commerce",
    icon: ShoppingBag,
    href: "/dashboard/ecommerce",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/dashboard/calendar",
  },
  {
    type: "section",
    label: "COMPONENTS",
  },
  {
    label: "Cards",
    icon: LayoutDashboard,
    href: "/components/cards",
  },
  {
    label: "Forms",
    icon: FileText,
    href: "/components/forms",
  },
  {
    label: "Tables",
    icon: Database,
    href: "/components/tables",
  },
  {
    label: "Icons",
    icon: BarChart3,
    href: "/components/icons",
  },
  {
    label: "Charts",
    icon: BarChart3,
    href: "/components/charts",
  },
  {
    label: "Authentications",
    icon: Shield,
    href: "/components/auth",
  },
  {
    type: "section",
    label: "SETTINGS",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    label: "Roles & Permissions",
    icon: Shield,
    href: "/settings/roles",
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/settings/payments",
  },
  {
    label: "Users",
    icon: Users,
    href: "/settings/users",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div
      className={cn(
        "bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-50 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-foreground">OrbitNest</h1>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-accent rounded transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {!isCollapsed && (
            <button className="p-1 hover:bg-accent rounded">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-input bg-background text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {/* Menu Items */}
      <nav className={cn("flex-1 space-y-1", isCollapsed ? "p-2" : "p-4")}>
        {menuItems.map((item, index) => {
          if (item.type === "section") {
            if (isCollapsed) return null;
            return (
              <div key={index} className="pt-4 pb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                  {item.label}
                </p>
              </div>
            );
          }

          const Icon = item.icon!;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.label);

          return (
            <div key={item.label}>
              <Link
                href={item.href || "#"}
                onClick={(e) => {
                  if (hasChildren && !isCollapsed) {
                    e.preventDefault();
                    toggleExpanded(item.label);
                  }
                }}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors group relative",
                  isCollapsed
                    ? "justify-center px-2 py-2.5"
                    : "justify-between px-3 py-2.5",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "ml-2 px-2 py-0.5 text-xs rounded",
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-primary/20 text-primary"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </div>
                {hasChildren && !isCollapsed && (
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform flex-shrink-0",
                      isExpanded && "transform rotate-90",
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                )}
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                    {item.badge && (
                      <span className="ml-1 px-1 py-0.5 text-xs bg-primary/20 text-primary rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
              {hasChildren && isExpanded && !isCollapsed && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        pathname === child.href
                          ? "text-primary font-medium bg-primary/10"
                          : "text-muted-foreground hover:bg-accent"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
