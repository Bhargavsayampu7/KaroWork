import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, Eye, FileText, Inbox, MessageSquare, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Employers() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Banner */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-primary/10 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back!</h2>
                  <p className="text-muted-foreground max-w-2xl">Manage your job postings and connect with talented students. Your company profile helps students find the right opportunities.</p>
                </div>
                <Button variant="accent" className="whitespace-nowrap" onClick={() => navigate('/post-job')}><Plus className="w-4 h-4 mr-2"/> Post Your First Job</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Total Jobs Posted</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between"><span className="text-3xl font-bold">12</span><span className="text-sm text-emerald-600">+2 this month</span></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Active Applications</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between"><span className="text-3xl font-bold">48</span><span className="text-sm text-emerald-600">+12 this week</span></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Interviews Scheduled</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between"><span className="text-3xl font-bold">8</span><span className="text-sm text-muted-foreground">3 today</span></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Profile Views</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between"><span className="text-3xl font-bold">234</span><span className="text-sm text-emerald-600">+18% this month</span></CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition cursor-pointer" onClick={() => navigate('/post-job')}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">Post New Job</div>
                <div className="text-sm text-muted-foreground">Create a new job posting for students</div>
              </div>
              <div className="p-2 rounded-md bg-primary/10"><Plus className="w-5 h-5"/></div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition cursor-pointer" onClick={() => navigate('/employer/applications')}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">View Applications</div>
                <div className="text-sm text-muted-foreground">Review and manage job applications</div>
              </div>
              <div className="p-2 rounded-md bg-primary/10"><Inbox className="w-5 h-5"/></div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition cursor-pointer" onClick={() => navigate('/employer/manage')}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">Manage Jobs</div>
                <div className="text-sm text-muted-foreground">Edit or close your active job posts</div>
              </div>
              <div className="p-2 rounded-md bg-primary/10"><FileText className="w-5 h-5"/></div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition cursor-pointer" onClick={() => navigate('/employer/interviews')}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">Schedule Interviews</div>
                <div className="text-sm text-muted-foreground">Set up interviews with candidates</div>
              </div>
              <div className="p-2 rounded-md bg-primary/10"><Calendar className="w-5 h-5"/></div>
            </CardContent>
          </Card>
        </div>

        {/* Activity + Interviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="outline" size="sm">View All <ArrowRight className="w-4 h-4 ml-2"/></Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'New Application Received', subtitle: 'Rahul Sharma applied for Frontend Developer position', status: 'New' },
                { title: 'Job Post Viewed', subtitle: 'Marketing Intern position viewed 15 times today', status: 'Done', icon: Eye },
                { title: 'Message from Candidate', subtitle: 'Priya Patel asked about work timings', status: 'Pending', icon: MessageSquare },
                { title: 'Interview Completed', subtitle: 'Completed interview with Arjun Kumar', status: 'Done', icon: Calendar },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start justify-between border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">RS</div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                    </div>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-md ${item.status === 'New' ? 'bg-red-100 text-red-700' : item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Priya Sharma', role: 'Frontend Developer', time: 'Today, 2:00 PM', type: 'Video Call' },
                { name: 'Rahul Kumar', role: 'Marketing Intern', time: 'Tomorrow, 10:30 AM', type: 'In-person' },
                { name: 'Anjali Patel', role: 'Content Writer', time: 'Friday, 3:00 PM', type: 'Phone Call' },
              ].map((i, idx) => (
                <div key={idx} className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <div className="font-medium">{i.name}</div>
                    <div className="text-sm text-muted-foreground">{i.role} • {i.type}</div>
                    <div className="text-xs text-muted-foreground">{i.time}</div>
                  </div>
                  <Button size="sm" variant="outline">Join</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-6 text-center">
                <div className="text-3xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Profile Completion</div>
                <div className="text-xs text-emerald-600">+5% this week</div>
              </div>
              <div className="border rounded-md p-6 text-center">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Avg. Applications/Job</div>
                <div className="text-xs text-emerald-600">Above average</div>
              </div>
              <div className="border rounded-md p-6 text-center">
                <div className="text-3xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Company Rating</div>
                <div className="text-xs text-emerald-600">Excellent</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
