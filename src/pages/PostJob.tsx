import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Part-time',
    tags: '',
    description: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.location || !form.description) {
      toast({ title: 'Missing fields', description: 'Please fill the required fields.' });
      return;
    }
    const job = {
      id: 'job-' + Math.random().toString(36).slice(2),
      title: form.title,
      company: form.company,
      location: form.location,
      salary: form.salary || '—',
      type: form.type,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      description: form.description,
      posted: new Date().toLocaleDateString(),
      status: 'Open' as const,
    };
    const raw = localStorage.getItem('employerJobs');
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(job);
    localStorage.setItem('employerJobs', JSON.stringify(arr));
    toast({ title: 'Job posted', description: `${form.title} at ${form.company} created.` });
    navigate('/employers');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Post a Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Job Title *</label>
                <Input id="title" name="title" value={form.title} onChange={onChange} placeholder="e.g., Marketing Intern" />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">Company *</label>
                <Input id="company" name="company" value={form.company} onChange={onChange} placeholder="Your company" />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location *</label>
                <Input id="location" name="location" value={form.location} onChange={onChange} placeholder="City, Country / Remote" />
              </div>
              <div className="space-y-2">
                <label htmlFor="salary" className="text-sm font-medium">Salary Range</label>
                <Input id="salary" name="salary" value={form.salary} onChange={onChange} placeholder="₹8,000-12,000/month" />
              </div>
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">Job Type</label>
                <Input id="type" name="type" value={form.type} onChange={onChange} placeholder="Part-time, Internship, Remote" />
              </div>
              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-medium">Tags</label>
                <Input id="tags" name="tags" value={form.tags} onChange={onChange} placeholder="comma,separated,tags" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description *</label>
                <textarea id="description" name="description" value={form.description} onChange={onChange} rows={8} className="w-full border rounded-md p-3 bg-background" placeholder="Describe responsibilities, requirements, and perks..." />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit">Publish Job</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
