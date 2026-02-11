import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Menu, X, Rocket, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border py-2 shadow-sm" 
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="The Tech Crew" className="w-10 h-10 object-contain" />
            <span className="font-display font-bold text-xl tracking-tight text-foreground">The Tech Crew</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative group",
                  location === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full",
                  location === link.href && "w-full"
                )} />
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 border-l border-border pl-6">
              {user ? (
                <>
                  <Link href="/admin" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center transition-colors">
                    <LayoutGrid className="w-4 h-4 mr-1.5" /> Dashboard
                  </Link>
                  <button onClick={() => logout()} className="text-sm text-muted-foreground hover:text-destructive transition-colors">Sign Out</button>
                </>
              ) : (
                <Link href="/login" className="text-xs opacity-0 cursor-default hover:opacity-0 transition-none" title="Admin Login">.</Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {user && (
              <Link href="/admin" className="p-2 text-primary">
                <LayoutGrid className="w-6 h-6" />
              </Link>
            )}
            <button 
              className="p-2 text-foreground focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {links.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block py-2 text-lg font-medium transition-colors",
                    location === link.href 
                      ? "text-primary pl-2 border-l-2 border-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <>
                    <Link 
                      href="/admin" 
                      className="flex items-center py-3 text-lg font-semibold text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutGrid className="w-5 h-5 mr-2" /> Admin Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left py-3 text-lg font-medium text-destructive"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/login" 
                    className="block py-2 text-xs opacity-0 cursor-default"
                    onClick={() => setIsOpen(false)}
                  >
                    .
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
