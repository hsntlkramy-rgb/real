import { Switch, Route, Router as WouterRouter } from "wouter";
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
    <WouterRouter base="/real">
      <AppRouter />
    </WouterRouter>
  );
}

export default App;
