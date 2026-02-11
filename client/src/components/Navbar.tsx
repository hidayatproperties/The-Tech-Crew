import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Menu, X, Rocket, LayoutGrid, Phone } from "lucide-react";
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
      setIsScrolled(window.scrollY > 50);
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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-4 transition-all duration-500">
      <nav 
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-in-out flex items-center justify-between",
          isScrolled 
            ? "w-full max-w-4xl bg-background/80 backdrop-blur-xl border border-border shadow-2xl rounded-3xl px-6 py-2" 
            : "w-full max-w-7xl bg-transparent px-4 py-4"
        )}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            {!isScrolled && (
              <span className="font-display font-bold text-xl tracking-tight text-foreground hidden sm:block">The Tech Crew</span>
            )}
          </Link>

          {/* Desktop Menu */}
          {!isScrolled && (
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
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a 
              href="tel:+971000000000" 
              className="bg-primary/10 hover:bg-primary/20 p-3 rounded-2xl transition-all duration-300 text-primary group"
              title="Call Us"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            
            <button 
              className="bg-muted hover:bg-muted/80 p-3 rounded-2xl transition-all duration-300 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* Admin Context */}
          {user && !isScrolled && (
            <div className="hidden md:flex items-center space-x-4 border-l border-border pl-6">
              <Link href="/admin" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center transition-colors">
                <LayoutGrid className="w-4 h-4 mr-1.5" /> Dashboard
              </Link>
              <button onClick={() => logout()} className="text-sm text-muted-foreground hover:text-destructive transition-colors">Sign Out</button>
            </div>
          )}
        </div>

        {/* Mobile/Full Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-4 mx-auto w-[95%] max-w-lg bg-background/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl overflow-hidden p-6 z-50"
            >
              <div className="space-y-4">
                {links.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block py-3 px-4 rounded-2xl text-lg font-medium transition-all hover:bg-primary/5",
                      location === link.href 
                        ? "text-primary bg-primary/10" 
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
                        className="flex items-center py-4 px-4 rounded-2xl text-lg font-semibold text-primary hover:bg-primary/5"
                        onClick={() => setIsOpen(false)}
                      >
                        <LayoutGrid className="w-5 h-5 mr-3" /> Admin Dashboard
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left py-4 px-4 rounded-2xl text-lg font-medium text-destructive hover:bg-destructive/5"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link 
                      href="/login" 
                      className="block py-2 text-center text-xs text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Access
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
