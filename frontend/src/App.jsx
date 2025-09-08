import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Admin from './pages/Admin'
import HR from './pages/HR'
import Support from './pages/Support'
import Forbidden from './pages/Forbidden'

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Welcome</h2>
      <p>Use the nav to visit dashboards based on your role.</p>
    </div>
  )
}

export default function App() {
  return (

    <AuthProvider>

      <BrowserRouter>
      
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['Admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hr"
            element={
              <ProtectedRoute roles={['HR']}>
                <HR />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support"
            element={
              <ProtectedRoute roles={['SupportAgent']}>
                <Support />
              </ProtectedRoute>
            }
          />

          <Route path="/403" element={<Forbidden />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
