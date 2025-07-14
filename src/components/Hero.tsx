import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, TrendingUp, Users, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const categories = [
    { name: "On-Campus", icon: "🎓", count: "150+" },
    { name: "Cafes & Food", icon: "☕", count: "89+" },
    { name: "Events", icon: "🎉", count: "45+" },
    { name: "Tutoring", icon: "📚", count: "120+" },
    { name: "Delivery", icon: "🚚", count: "78+" },
  ];

  const stats = [
    { icon: TrendingUp, label: "Jobs Posted", value: "2,500+" },
    { icon: Users, label: "Students Hired", value: "8,200+" },
    { icon: Star, label: "Success Rate", value: "94%" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Students working"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Find Your Perfect
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Part-Time Job</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with local employers and discover flexible opportunities designed for students like you.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-card animate-slide-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-border/50 focus:border-primary"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Location (e.g., Delhi, Mumbai...)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-base border-border/50 focus:border-primary"
                />
              </div>
              <Button variant="accent" size="lg" className="h-12 px-8 text-base font-semibold">
                Find Jobs
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold text-foreground">Popular Categories</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-card/60 hover:bg-card backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                  <span className="ml-2 text-primary font-semibold">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:shadow-md transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
    </section>
  );
}