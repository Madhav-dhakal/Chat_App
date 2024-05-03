import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/main.scss"
import { AuthContextProvider } from './context/auth.context.jsx'
import { ChatContextProvider } from './context/chat.contex.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </ChatContextProvider>
  </AuthContextProvider>
)
