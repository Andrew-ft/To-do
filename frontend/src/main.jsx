import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './router/router'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={ router }/>
)