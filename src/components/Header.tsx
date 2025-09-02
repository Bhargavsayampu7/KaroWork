import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-foreground">KaroWork</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user?.role !== 'employer' && (
              <Link to="/" className="text-foreground hover:text-primary transition-colors duration-200">
                Find Jobs
              </Link>
            )}
            {user?.role === 'employer' && (
              <Link to="/employers" className="text-foreground hover:text-primary transition-colors duration-200">
                Dashboard
              </Link>
            )}
            {user?.role === 'employee' && (
              <Link to="/saved" className="text-foreground hover:text-primary transition-colors duration-200">
                Saved Jobs
              </Link>
            )}
            {user && (
              <Link to="/profile" className="text-foreground hover:text-primary transition-colors duration-200">
                Profile
              </Link>
            )}
            <button
              onClick={() => {
                if (!user) {
                  navigate('/login', { state: { from: '/employers' } });
                } else {
                  navigate('/employers');
                }
              }}
              className={cn(
              "text-foreground hover:text-primary transition-colors duration-200",
              user?.role === 'employer' && "text-primary"
            )}
            >
              For Employers
            </button>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors duration-200">
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button variant="accent" size="sm" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="hidden lg:inline">Role:</span>
                  <div className="flex gap-1 rounded-md border border-border p-1">
                    <Button
                      size="sm"
                      variant={user.role === 'employee' ? 'default' : 'ghost'}
                      onClick={() => { switchRole('employee'); navigate('/'); }}
                    >
                      Student
                    </Button>
                    <Button
                      size="sm"
                      variant={user.role === 'employer' ? 'default' : 'ghost'}
                      onClick={() => { switchRole('employer'); navigate('/employers'); }}
                    >
                      Employer
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </>
            )}
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
            {user?.role !== 'employer' && (
              <Link
                to="/"
                className="block text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </Link>
            )}
            {user?.role === 'employer' && (
              <Link
                to="/employers"
                className="block text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {user?.role === 'employee' && (
              <Link
                to="/saved"
                className="block text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Saved Jobs
              </Link>
            )}
            <button
              className="block text-left w-full text-foreground hover:text-primary transition-colors duration-200"
              onClick={() => {
                setIsMenuOpen(false);
                if (!user) {
                  navigate('/login', { state: { from: '/employers' } });
                } else {
                  navigate('/employers');
                }
              }}
            >
              For Employers
            </button>
            <Link
              to="/about"
              className="block text-foreground hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              {!user ? (
                <>
                  <Button variant="ghost" size="sm" className="justify-start" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>
                    <User className="w-4 h-4 mr-2" />
                    Log In
                  </Button>
                  <Button variant="accent" size="sm" className="justify-start" onClick={() => { setIsMenuOpen(false); navigate('/signup'); }}>
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <Button size="sm" variant={user.role === 'employee' ? 'default' : 'ghost'} onClick={() => { switchRole('employee'); navigate('/'); }}>
                      Student
                    </Button>
                    <Button size="sm" variant={user.role === 'employer' ? 'default' : 'ghost'} onClick={() => { switchRole('employer'); navigate('/employers'); }}>
                      Employer
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="justify-start" onClick={() => { logout(); setIsMenuOpen(false); }}>
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}