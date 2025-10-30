/**
 * @file index.tsx
 * @description Entry point of the FilmUnity web application.
 * This file initializes the React rendering process, applies global styles, 
 * and mounts the root `App` component inside a `StrictMode` wrapper for better development diagnostics.
 *
 * @project FilmUnity
 * @version 1.0.0
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Main render function that mounts the FilmUnity application
 * into the DOM element with the ID `root`.
 *
 * @example
 * ```tsx
 * This is automatically executed when the app starts.
 * createRoot(document.getElementById('root')!).render(
 *   <StrictMode>
 *     <App />
 *   </StrictMode>
 * )
 * ```
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
