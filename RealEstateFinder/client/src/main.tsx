import { createRoot } from "react-dom/client";
import App from "./App";

// Remove CSS import temporarily to isolate the issue
// import "./index.css";

console.log('🔧 Main entry point - Starting RealEstateFinder app');

try {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log('✅ App rendered successfully');
  } else {
    console.error('❌ Root element not found');
  }
} catch (error) {
  console.error('❌ Error rendering app:', error);
}
