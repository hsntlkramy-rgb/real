import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import HomePage from './pages/home';
import MapPage from './pages/map';
import SwipePage from './pages/swipe';
import PropertyDetailPage from './pages/property-detail';
import TestUKPage from './pages/test-uk';
import AuthPage from './pages/auth';
import HomeSimplePage from './pages/home-simple';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          {/* Use simple home page to avoid build errors */}
          <Route path="/" component={HomeSimplePage} />
          <Route path="/map" component={MapPage} />
          <Route path="/swipe" component={SwipePage} />
          <Route path="/property/:id" component={PropertyDetailPage} />
          <Route path="/test-uk" component={TestUKPage} />
          <Route path="/auth" component={AuthPage} />
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
