import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Simple main entry point without complex imports
console.log('🔧 Main entry point - Starting RealEstateFinder app');

createRoot(document.getElementById("root")!).render(<App />);
