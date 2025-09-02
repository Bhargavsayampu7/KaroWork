import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployerManageJobs() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Manage Jobs</h1>
          <Button onClick={() => navigate('/post-job')}><Plus className="w-4 h-4 mr-2"/> Post Job</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Job Postings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Filters />
            <JobsTable />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function useEmployerJobs() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'All' | 'Open' | 'Closed'>('All');
  const data = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('employerJobs') || '[]'); } catch { return []; }
  }, []);
  const filtered = useMemo(() => {
    return data.filter((j: any) => {
      const matchesQ = q ? (j.title + j.company + j.location).toLowerCase().includes(q.toLowerCase()) : true;
      const matchesS = status === 'All' ? true : j.status === status;
      return matchesQ && matchesS;
    });
  }, [data, q, status]);
  return { data: filtered, q, setQ, status, setStatus };
}

function Filters() {
  const { q, setQ, status, setStatus } = useEmployerJobsContext();
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center">
      <div className="flex-1"><Input placeholder="Search title, company, location" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <Select value={status} onValueChange={(v: any) => setStatus(v)}>
        <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="Closed">Closed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function JobsTable() {
  const { data } = useEmployerJobsContext();
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No jobs found.</p>;
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((j: any) => (
            <TableRow key={j.id}>
              <TableCell className="font-medium">{j.title}</TableCell>
              <TableCell>{j.company}</TableCell>
              <TableCell>{j.location}</TableCell>
              <TableCell>{j.type}</TableCell>
              <TableCell>{j.posted}</TableCell>
              <TableCell>{j.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Simple context via module-scoped singleton for this page
let _jobsState: ReturnType<typeof useEmployerJobs> | null = null;
function useEmployerJobsContext() {
  if (!_jobsState) _jobsState = useEmployerJobs();
  return _jobsState;
}
