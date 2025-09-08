import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, roles }) {
    const { isAuthenticated, role } = useAuth()
    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (role === 'SuperAdmin') return children
    if (roles && !roles.includes(role)) return <Navigate to="/403" replace />
    return children
}


