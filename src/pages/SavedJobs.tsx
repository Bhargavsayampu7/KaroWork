import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSavedJobs } from '@/contexts/SavedJobsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function SavedJobs() {
  const { saved, removeJob } = useSavedJobs();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Saved Jobs</h1>
          <p className="text-muted-foreground">Jobs you've bookmarked to view later.</p>
        </div>

        {saved.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center space-y-3">
              <p className="text-muted-foreground">No saved jobs yet.</p>
              <Button onClick={() => navigate('/')}>Browse Jobs</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saved.map((job) => (
              <Card key={job.id} className="p-0">
                <CardContent className="p-6 space-y-3">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })}>View Details</Button>
                    <Button variant="ghost" onClick={() => removeJob(job.id)}>Remove</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
