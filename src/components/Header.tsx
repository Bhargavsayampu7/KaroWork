import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">KaroWork</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">
              Find Jobs
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">
              For Employers
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">
              About
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button variant="accent" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="py-4 space-y-4 border-t border-border">
            <a
              href="#"
              className="block text-foreground hover:text-primary transition-colors duration-200"
            >
              Find Jobs
            </a>
            <a
              href="#"
              className="block text-foreground hover:text-primary transition-colors duration-200"
            >
              For Employers
            </a>
            <a
              href="#"
              className="block text-foreground hover:text-primary transition-colors duration-200"
            >
              About
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" size="sm" className="justify-start">
                <User className="w-4 h-4 mr-2" />
                Log In
              </Button>
              <Button variant="accent" size="sm" className="justify-start">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}