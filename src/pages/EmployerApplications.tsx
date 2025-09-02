import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMemo, useState } from 'react';

export default function EmployerApplications() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Applications</h1>
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Filters />
            <ApplicationsTable />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function useApplications() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'All' | 'Submitted' | 'Reviewed' | 'Interview' | 'Rejected'>('All');
  const data = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('appliedJobs') || '[]'); } catch { return []; }
  }, []);
  const filtered = useMemo(() => {
    return data.filter((a: any) => {
      const matchesQ = q ? (a.job.title + a.job.company + (a.applicant?.name || '')).toLowerCase().includes(q.toLowerCase()) : true;
      const matchesS = status === 'All' ? true : a.status === status;
      return matchesQ && matchesS;
    });
  }, [data, q, status]);
  return { data: filtered, q, setQ, status, setStatus };
}

function Filters() {
  const { q, setQ, status, setStatus } = useAppsCtx();
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center">
      <div className="flex-1"><Input placeholder="Search job, company, candidate" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <Select value={status} onValueChange={(v: any) => setStatus(v)}>
        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Submitted">Submitted</SelectItem>
          <SelectItem value="Reviewed">Reviewed</SelectItem>
          <SelectItem value="Interview">Interview</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function ApplicationsTable() {
  const { data } = useAppsCtx();
  if (data.length === 0) return <p className="text-sm text-muted-foreground">No applications found.</p>;
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((a: any) => (
            <TableRow key={a.id}>
              <TableCell className="font-medium">{a.applicant?.name || '—'}</TableCell>
              <TableCell>{a.job.title}</TableCell>
              <TableCell>{a.job.company}</TableCell>
              <TableCell>{new Date(a.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{a.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

let _appsState: ReturnType<typeof useApplications> | null = null;
function useAppsCtx() {
  if (!_appsState) _appsState = useApplications();
  return _appsState;
}
