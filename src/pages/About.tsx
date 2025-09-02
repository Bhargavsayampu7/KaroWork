import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Briefcase, Rocket } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 space-y-16">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Built for Ambition. Designed for Elegance.</h1>
          <p className="text-lg text-muted-foreground">
            KaroWork connects ambitious students with premium employers. Discover internships, part-time roles, and brand programs — all in a refined, distraction-free experience.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild><a href="/signup">Get Started</a></Button>
            <Button variant="outline" asChild><a href="/about#how">Learn More</a></Button>
          </div>
        </section>

        {/* Value Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            icon: Users,
            title: 'For Students',
            desc: 'Curated, campus-friendly roles that fit your schedule and build real experience.'
          },{
            icon: Briefcase,
            title: 'For Employers',
            desc: 'Reach motivated student talent and manage applications with ease.'
          },{
            icon: Rocket,
            title: 'Our Mission',
            desc: 'Enable 1M students to gain practical experience while studying.'
          }].map((i, idx) => (
            <Card key={idx} className="border-border/70">
              <CardContent className="p-6 space-y-2">
                <i.icon className="w-6 h-6 text-primary" />
                <div className="font-semibold">{i.title}</div>
                <p className="text-sm text-muted-foreground">{i.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* How it works */}
        <section id="how" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <Card className="border-border/70">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-semibold">How it works</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-primary" />Students browse curated roles and save favorites.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-primary" />Apply in seconds with role-specific flows.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-primary" />Employers post jobs, track applications, and schedule interviews.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-semibold">Get started</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button asChild className="w-full"><a href="/signup">I'm a Student</a></Button>
                <Button variant="outline" asChild className="w-full"><a href="/signup">I'm an Employer</a></Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
