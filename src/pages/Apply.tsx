import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function Apply() {
  const location = useLocation() as { state?: { job?: any } };
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const pendingJob = useMemo(() => {
    if (location.state?.job) return location.state.job;
    const raw = localStorage.getItem('pendingApplyJob');
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  }, [location.state]);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState('');
  const [cover, setCover] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/apply' } });
      return;
    }
    if (user.role !== 'employee') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!pendingJob) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">No job selected. Please return to the listings.</p>
              <div className="mt-4"><Button onClick={() => navigate('/')}>Go Home</Button></div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const submit = () => {
    const entry = {
      id: 'app-' + Math.random().toString(36).slice(2),
      job: pendingJob,
      applicant: { name, email, phone, resume, cover },
      createdAt: new Date().toISOString(),
      status: 'Submitted' as const,
    };
    const raw = localStorage.getItem('appliedJobs');
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(entry);
    localStorage.setItem('appliedJobs', JSON.stringify(arr));
    localStorage.removeItem('pendingApplyJob');
    toast({ title: 'Application submitted', description: `Applied to ${pendingJob.title} at ${pendingJob.company}` });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Apply to {pendingJob.title}</h1>
            <p className="text-muted-foreground">{pendingJob.company} • {pendingJob.location}</p>
          </div>
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Resume Link</label>
                  <Input value={resume} onChange={(e) => setResume(e.target.value)} placeholder="https://drive.link/resume.pdf" />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Cover Letter</label>
                <Textarea value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Write a brief note..." rows={6} />
              </div>
              <div className="pt-2 flex gap-3">
                <Button onClick={submit} className="min-w-32">Submit Application</Button>
                <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
