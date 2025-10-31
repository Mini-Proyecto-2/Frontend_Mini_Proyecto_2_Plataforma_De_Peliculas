/**
 * @file App.tsx
 * @description Root component of the FilmUnity application. 
 * It serves as the main entry point that initializes the routing system 
 * and global providers through the `AppRouter` component.
 */

import AppRouter from "./router/AppRouter";

/**
 * Root application component.
 *
 * @function App
 * @description Wraps and renders the `AppRouter` component, 
 * which contains all routes, authentication context, and UI-level providers.
 *
 * @returns {JSX.Element} The root JSX element of the FilmUnity app.
 *
 * @example
 * ```tsx
 * import { createRoot } from "react-dom/client";
 * import App from "./App";
 *
 * const root = createRoot(document.getElementById("root")!);
 * root.render(<App />);
 * ```
 */
function App() {
  return <AppRouter />;
}

export default App;
