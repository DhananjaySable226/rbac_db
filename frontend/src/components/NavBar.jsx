import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
    const { role, setToken, setRole, setUser, isAuthenticated } = useAuth()

    function logout() {
        setToken(null)
        setRole(null)
        setUser(null)
    }

    return (
        <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #ddd' }}>
            <Link to="/">Home</Link>
            {!isAuthenticated && <Link to="/login">Login</Link>}
            {(role === 'Admin' || role === 'SuperAdmin') && <Link to="/admin">Admin</Link>}
            {(role === 'HR' || role === 'SuperAdmin') && <Link to="/hr">HR</Link>}
            {(role === 'SupportAgent' || role === 'SuperAdmin') && <Link to="/support">Support</Link>}
            {isAuthenticated && (
                <button onClick={logout} style={{ marginLeft: 'auto' }}>Logout</button>
            )}
        </nav>
    )
}


