import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedJobs } from '@/contexts/SavedJobsContext';
import { useMemo, useState } from 'react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { saved, removeJob } = useSavedJobs();
  const applied = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('appliedJobs') || '[]'); } catch { return []; }
  }, []);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-6">Your Profile</h1>
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="border-border/70 max-w-2xl">
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="pt-2">
                  <Button onClick={() => updateProfile({ name, email })}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applied">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Applied Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                {applied.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No applications yet.</p>
                ) : (
                  <div className="space-y-3">
                    {applied.map((a: any) => (
                      <div key={a.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div>
                          <div className="font-medium">{a.job.title}</div>
                          <div className="text-sm text-muted-foreground">{a.job.company} • {a.job.location}</div>
                        </div>
                        <div className="text-sm">{a.status}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                {saved.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No saved jobs.</p>
                ) : (
                  <div className="space-y-3">
                    {saved.map((j) => (
                      <div key={j.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div>
                          <div className="font-medium">{j.title}</div>
                          <div className="text-sm text-muted-foreground">{j.company} • {j.location}</div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => removeJob(j.id)}>Remove</Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
