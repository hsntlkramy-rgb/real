import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/home";
import SwipePage from "./pages/swipe";
import MapPage from "./pages/map";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/swipe" component={SwipePage} />
      <Route path="/map" component={MapPage} />
      <Route path="*" component={HomePage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base="/real">
        <AppRouter />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
