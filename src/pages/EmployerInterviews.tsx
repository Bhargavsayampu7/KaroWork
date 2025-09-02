import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';

export default function EmployerInterviews() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Interviews</h1>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Interview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ScheduleForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Filters />
            <InterviewsTable />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function useInterviews() {
  const [q, setQ] = useState('');
  const [when, setWhen] = useState<'All' | 'Upcoming' | 'Past'>('All');
  const data = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('interviews') || '[]'); } catch { return []; }
  }, []);
  const filtered = useMemo(() => {
    const now = Date.now();
    return data.filter((iv: any) => {
      const matchesQ = q ? (iv.job.title + iv.candidate.name).toLowerCase().includes(q.toLowerCase()) : true;
      const ts = new Date(iv.datetime).getTime();
      const matchesWhen = when === 'All' ? true : when === 'Upcoming' ? ts >= now : ts < now;
      return matchesQ && matchesWhen;
    });
  }, [data, q, when]);
  return { data: filtered, q, setQ, when, setWhen };
}

function Filters() {
  const { q, setQ, when, setWhen } = useInterviewsCtx();
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center">
      <div className="flex-1"><Input placeholder="Search job or candidate" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <Select value={when} onValueChange={(v: any) => setWhen(v)}>
        <SelectTrigger className="w-[160px]"><SelectValue placeholder="When" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Upcoming">Upcoming</SelectItem>
          <SelectItem value="Past">Past</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function ScheduleForm() {
  const [appId, setAppId] = useState('');
  const [datetime, setDatetime] = useState('');
  const applications = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('appliedJobs') || '[]'); } catch { return []; }
  }, []);
  const schedule = () => {
    const app = applications.find((a: any) => a.id === appId);
    if (!app || !datetime) return;
    const entry = {
      id: 'iv-' + Math.random().toString(36).slice(2),
      applicationId: app.id,
      job: app.job,
      candidate: { name: app.applicant?.name || '—', email: app.applicant?.email || '' },
      datetime,
    };
    const raw = localStorage.getItem('interviews');
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(entry);
    localStorage.setItem('interviews', JSON.stringify(arr));
    setAppId('');
    setDatetime('');
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <Select value={appId} onValueChange={setAppId}>
        <SelectTrigger><SelectValue placeholder="Select application" /></SelectTrigger>
        <SelectContent>
          {applications.map((a: any) => (
            <SelectItem key={a.id} value={a.id}>{a.applicant?.name || '—'} — {a.job.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} />
      <Button onClick={schedule}>Schedule</Button>
    </div>
  );
}

function InterviewsTable() {
  const { data } = useInterviewsCtx();
  if (data.length === 0) return <p className="text-sm text-muted-foreground">No interviews found.</p>;
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((iv: any) => (
            <TableRow key={iv.id}>
              <TableCell className="font-medium">{iv.candidate.name}</TableCell>
              <TableCell>{iv.job.title}</TableCell>
              <TableCell>{new Date(iv.datetime).toLocaleString()}</TableCell>
              <TableCell>{iv.candidate.email || '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

let _ivState: ReturnType<typeof useInterviews> | null = null;
function useInterviewsCtx() {
  if (!_ivState) _ivState = useInterviews();
  return _ivState;
}
