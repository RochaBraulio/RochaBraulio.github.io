
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-[#FCFBF8] dark:bg-[#0A0A0A] backdrop-blur 
      supports-[backdrop-filter]:bg-[#FCFBF8]/60 dark:supports-[backdrop-filter]:bg-[#0A0A0A]/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-xl flex items-center">
            <span className="text-primary">My</span>
            <span className="text-foreground">Personal Blog</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 flex flex-col gap-4 animate-in md:hidden">
                <Link to="/" className="text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/about" className="text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <SearchBar onSearch={onSearch} />
                <div className="flex justify-end">
                  <ThemeToggle />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="flex items-center gap-6 text-sm">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <SearchBar onSearch={onSearch} />
              <ThemeToggle />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
