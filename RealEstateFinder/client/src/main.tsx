import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Force UK properties to be included in the build
import { ukProperties } from "./data/properties-simple";
console.log('🔧 Main entry point - UK Properties available:', ukProperties.length);

createRoot(document.getElementById("root")!).render(<App />);
