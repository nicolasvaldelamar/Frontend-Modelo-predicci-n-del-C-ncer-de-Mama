import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PredictionProvider } from './context/PredictionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PredictionProvider>
      <App />
    </PredictionProvider>
  </React.StrictMode>,
)
