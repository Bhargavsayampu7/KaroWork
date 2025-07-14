import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Filter, 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Grid3X3, 
  List,
  TrendingUp,
  Clock
} from "lucide-react";

const sampleJobs = [
  {
    id: "1",
    title: "Campus Ambassador",
    company: "TechStart Inc.",
    location: "New Delhi",
    salary: "₹8,000-12,000/month",
    type: "Part-time",
    posted: "2 days ago",
    description: "Looking for enthusiastic students to represent our brand on campus. Flexible hours, great experience in marketing and networking.",
    tags: ["Marketing", "Social Media", "Campus"],
    rating: 4.5,
    featured: true
  },
  {
    id: "2",
    title: "Content Writer Intern",
    company: "Digital Media Co.",
    location: "Mumbai",
    salary: "₹6,000-10,000/month",
    type: "Remote",
    posted: "1 day ago",
    description: "Create engaging content for social media and blogs. Perfect for students studying journalism, English, or communications.",
    tags: ["Writing", "Social Media", "Remote"],
    rating: 4.2
  },
  {
    id: "3",
    title: "Cafe Barista",
    company: "Coffee Culture",
    location: "Bangalore",
    salary: "₹15,000-18,000/month",
    type: "Part-time",
    posted: "3 days ago",
    description: "Join our friendly team! Perfect for students who want to learn customer service skills while earning. Flexible evening shifts available.",
    tags: ["Customer Service", "Food & Beverage", "Evening Shift"],
    rating: 4.7
  },
  {
    id: "4",
    title: "Tutor - Mathematics",
    company: "EduCare Learning",
    location: "Pune",
    salary: "₹500-800/hour",
    type: "Freelance",
    posted: "5 days ago",
    description: "Teach high school mathematics to students. Great opportunity for engineering or math students to share knowledge and earn.",
    tags: ["Teaching", "Mathematics", "Flexible Hours"]
  },
  {
    id: "5",
    title: "Event Assistant",
    company: "EventPro",
    location: "Hyderabad",
    salary: "₹1,200/day",
    type: "Contract",
    posted: "1 week ago",
    description: "Help organize and manage events on weekends. Great networking opportunity and experience in event management.",
    tags: ["Events", "Weekend", "Networking"],
    rating: 4.3
  },
  {
    id: "6",
    title: "Social Media Intern",
    company: "GrowthHack Agency",
    location: "Chennai",
    salary: "₹8,000-15,000/month",
    type: "Internship",
    posted: "4 days ago",
    description: "Manage social media accounts for various clients. Learn digital marketing strategies while building your portfolio.",
    tags: ["Social Media", "Digital Marketing", "Portfolio Building"],
    featured: true
  }
];

const filters = [
  { label: "All Jobs", count: sampleJobs.length },
  { label: "Part-time", count: 2 },
  { label: "Remote", count: 1 },
  { label: "Internship", count: 1 },
  { label: "Freelance", count: 1 },
  { label: "Contract", count: 1 }
];

export function JobsList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Jobs");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Latest Opportunities
          </h2>
          <p className="text-muted-foreground">
            Discover part-time jobs that fit your schedule and skills
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by job title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none border-r border-border"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.label}
                variant={selectedFilter === filter.label ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.label)}
                className="h-8"
              >
                {filter.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Advanced Filters (collapsible) */}
          {showFilters && (
            <Card className="animate-slide-up">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input placeholder="Enter city or area" className="pl-9" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Salary Range
                    </label>
                    <Input placeholder="Min - Max salary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Posted Within
                    </label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">24h</Button>
                      <Button variant="outline" size="sm">3d</Button>
                      <Button variant="outline" size="sm">1w</Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setShowFilters(false)}>
                    Clear Filters
                  </Button>
                  <Button variant="accent">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Showing {sampleJobs.length} jobs</span>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>2 new today</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Sort by Latest
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {sampleJobs.map((job, index) => (
            <div
              key={job.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Jobs
          </Button>
        </div>
      </div>
    </section>
  );
}