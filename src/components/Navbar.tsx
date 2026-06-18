import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 group">
            <h1 className={`font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
              isScrolled ? "text-primary" : "text-primary md:text-white"
            }`}>
              A-One <span className={isScrolled ? "text-secondary" : "text-secondary md:text-white/90"}>Beauty</span>
            </h1>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-secondary ${
                      isScrolled ? "text-foreground" : "text-white/90"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <Button 
              className={`rounded-full px-6 transition-all ${
                isScrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20" 
                  : "bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10"
              }`}
              asChild
            >
              <a href="tel:+919303959697" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors ${isScrolled ? "text-foreground" : "text-primary"}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-border/50 shadow-xl transition-all duration-300 origin-top overflow-hidden ${
          isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-4 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="px-3 pt-4">
            <Button className="w-full rounded-full bg-primary hover:bg-primary/90" asChild>
              <a href="tel:+919303959697" className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now: +91 9303959697
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
