import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import { ThemeToggle } from './components/theme-toggle.tsx'
import { Providers } from './contexts/index.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <div className="fixed top-5 right-5">
        <ThemeToggle />
      </div>

      <App />
    </Providers>
  </StrictMode>,
)
