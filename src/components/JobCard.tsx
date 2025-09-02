import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Building, Star, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedJobs } from "@/contexts/SavedJobsContext";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    posted: string;
    description: string;
    tags: string[];
    rating?: number;
    logo?: string;
    featured?: boolean;
  };
  className?: string;
}

export function JobCard({ job, className }: JobCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { isSaved, toggleJob } = useSavedJobs();
  const bookmarked = isSaved(job.id);

  const handleViewDetails = () => {
    navigate(`/jobs/${job.id}`, { state: { job } });
  };

  const handleQuickApply = () => {
    if (!user) {
      toast({ title: "Please log in", description: "You must be logged in as a student to apply." });
      navigate('/login', { state: { from: '/apply' } });
      return;
    }
    if (user.role !== 'employee') {
      toast({ title: "Employers cannot apply", description: "Switch to Student role to apply." });
      return;
    }
    localStorage.setItem('pendingApplyJob', JSON.stringify(job));
    navigate('/apply', { state: { job } });
  };

  const toggleBookmark = () => {
    toggleJob(job);
    toast({
      title: bookmarked ? "Removed bookmark" : "Saved job",
      description: `${job.title} • ${job.company}`,
    });
  };

  return (
    <Card className={cn(
      "group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20",
      job.featured && "ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-transparent",
      className
    )}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Building className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors" onClick={toggleBookmark} aria-label={bookmarked ? 'Unsave' : 'Save'}>
            <Bookmark className={cn("w-5 h-5 hover:text-primary", bookmarked ? "text-primary fill-current" : "text-muted-foreground")} />
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="w-4 h-4 mr-2" />
              {job.salary}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              {job.posted}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {job.type}
          </Badge>
          {job.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{job.tags.length - 2} more
            </Badge>
          )}
        </div>

        {/* Rating */}
        {job.rating && (
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
            <span>{job.rating}</span>
            <span className="ml-1">company rating</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1" onClick={handleViewDetails}>
            View Details
          </Button>
          <Button variant="accent" className="flex-1" onClick={handleQuickApply}>
            Quick Apply
          </Button>
        </div>
      </CardFooter>

      {/* Featured Badge */}
      {job.featured && (
        <div className="absolute top-4 right-4 bg-gradient-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full">
          Featured
        </div>
      )}
    </Card>
  );
}