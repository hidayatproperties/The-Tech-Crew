import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Menu, X, Rocket, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/real-estate", label: "Real Estate" },
    { href: "/car-rentals", label: "Car Rentals" },
    { href: "/property-management", label: "Property Management" },
    { href: "/company-formation", label: "Company Formation" },
    { href: "/digital-marketing", label: "Digital Marketing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="The Tech Crew" className="w-10 h-10 object-contain" />
            <span className="font-display font-bold text-xl tracking-tight text-foreground">The Tech Crew</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            
              {user ? (
                <>
                  <Link href="/admin" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center">
                    <LayoutGrid className="w-4 h-4 mr-1" /> Dashboard
                  </Link>
                  <button onClick={() => logout()} className="text-sm text-muted-foreground hover:text-destructive">Sign Out</button>
                </>
              ) : (
                <Link href="/login" className="text-lg opacity-0 cursor-default hover:opacity-0 transition-none" title="Admin Login">.</Link>
              )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {user && (
              <Link href="/admin" className="md:hidden p-2 text-primary">
                <LayoutGrid className="w-6 h-6" />
              </Link>
            )}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-border/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location === link.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link 
                  href="/admin" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="block px-3 py-2 rounded-md text-lg font-medium opacity-0 cursor-default"
                onClick={() => setIsOpen(false)}
                title="Admin Login"
              >
                .
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
