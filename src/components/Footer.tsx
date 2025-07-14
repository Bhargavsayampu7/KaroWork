import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">KaroWork</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Connecting students with amazing part-time opportunities. Build your career while you study.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">For Students</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Career Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Interview Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Hiring Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Contact Sales
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Stay Updated</h4>
            <p className="text-background/80 text-sm">
              Get the latest job opportunities delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button variant="accent" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-background/60" />
              <span className="text-background/80">support@karowork.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-background/60" />
              <span className="text-background/80">+91 9876543210</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-background/60" />
              <span className="text-background/80">Mumbai, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-background/80">
            © 2024 KaroWork. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-background/80 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/80 hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-background/80 hover:text-background transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}