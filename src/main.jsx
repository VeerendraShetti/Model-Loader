import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BabylonScene from './babylonScene.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BabylonScene/>
      </StrictMode>,
)
