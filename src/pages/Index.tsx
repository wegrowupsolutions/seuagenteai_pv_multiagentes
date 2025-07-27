import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AgentsGrid from '@/components/AgentsGrid';

const Index = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <AgentsGrid />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
