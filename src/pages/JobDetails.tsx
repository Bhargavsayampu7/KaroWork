import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedJobs } from '@/contexts/SavedJobsContext';
import { useToast } from '@/hooks/use-toast';

export default function JobDetails() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { job?: any } };
  const params = useParams();
  const { user } = useAuth();
  const { isSaved, toggleJob } = useSavedJobs();
  const { toast } = useToast();

  const job = state?.job;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        {!job ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">No job data available for ID: {params.id}. Try navigating from the listings.</p>
              <div className="mt-4">
                <Button onClick={() => navigate('/')}>Go to Home</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {job.location}</div>
                <div className="flex items-center"><DollarSign className="w-4 h-4 mr-2" /> {job.salary}</div>
                <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {job.posted}</div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{job.type}</Badge>
                {job.tags?.map((t: string, i: number) => (
                  <Badge key={i} variant="outline">{t}</Badge>
                ))}
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">About the role</h2>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold">Take action</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => {
                        if (!user) {
                          toast({ title: 'Please log in', description: 'You must be logged in as a student to apply.' });
                          navigate('/login', { state: { from: '/apply' } });
                          return;
                        }
                        if (user.role !== 'employee') {
                          toast({ title: 'Employers cannot apply', description: 'Switch to Student role to apply.' });
                          return;
                        }
                        localStorage.setItem('pendingApplyJob', JSON.stringify(job));
                        navigate('/apply', { state: { job } });
                      }}
                    >
                      Apply Now
                    </Button>
                    <Button
                      variant={isSaved(job.id) ? 'secondary' : 'outline'}
                      onClick={() => {
                        const wasSaved = isSaved(job.id);
                        toggleJob(job);
                        toast({
                          title: wasSaved ? 'Removed from Saved' : 'Saved Job',
                          description: `${job.title} at ${job.company}`,
                        });
                      }}
                    >
                      {isSaved(job.id) ? 'Remove from Saved' : 'Save Job'}
                    </Button>
                    <Button variant="ghost" onClick={() => navigate(-1)}>Back to Listings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
