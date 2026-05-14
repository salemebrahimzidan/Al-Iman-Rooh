import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RuntimeErrorBoundary } from './app/providers/runtime-error-boundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RuntimeErrorBoundary appName="Al Eman Rooh">
      <App />
    </RuntimeErrorBoundary>
  </StrictMode>,
)
