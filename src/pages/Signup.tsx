import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Signup() {
  const { loginWithRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from as string | undefined;
  const handleSelect = (role: 'employee' | 'employer') => {
    loginWithRole(role);
    if (from) {
      navigate(from);
    } else {
      navigate(role === 'employer' ? '/employers' : '/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted/60 via-background to-background p-6">
      <Card className="w-full max-w-md shadow-xl border-border/60">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl tracking-tight">Join KaroWork</CardTitle>
          <CardDescription className="text-base">Select your role to get started</CardDescription>
        </CardHeader>

        <Tabs defaultValue="employee" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="employee">I'm a Student</TabsTrigger>
            <TabsTrigger value="employer">I'm an Employer</TabsTrigger>
          </TabsList>

          <TabsContent value="employee">
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-muted-foreground">Continue as a student to search and apply to jobs.</p>
              <Button className="w-full" onClick={() => handleSelect('employee')}>Continue as Student</Button>
            </CardContent>
          </TabsContent>

          <TabsContent value="employer">
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-muted-foreground">Continue as an employer to post jobs and manage applications.</p>
              <Button className="w-full" onClick={() => handleSelect('employer')}>Continue as Employer</Button>
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
