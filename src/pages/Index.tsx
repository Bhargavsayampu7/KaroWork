import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JobsList } from "@/components/JobsList";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <JobsList />
      <Footer />
    </div>
  );
};

export default Index;
