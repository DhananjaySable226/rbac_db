import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [email, setEmail] = useState('admin@test.com')
    const [password, setPassword] = useState('password')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { setToken, setRole, setUser } = useAuth()


    const predefinedUsers = [
        { role: 'SuperAdmin', email: 'superadmin@test.com' },
        { role: 'Admin', email: 'admin@test.com' },
        { role: 'HR', email: 'hr@test.com' },
        { role: 'Sales', email: 'sales@test.com' },
        { role: 'SupportAgent', email: 'support@test.com' },
    ]

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        try {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
            
            const res = await axios.post(`${baseURL}/login`, { email, password })

            setToken(res.data.token)
            setRole(res.data.role)
            setUser(res.data.user)


            if (res.data.role === 'Admin' || res.data.role === 'SuperAdmin') {
                navigate('/admin')
            }
            else if (res.data.role === 'HR') {
                navigate('/hr')
            }
            else if (res.data.role === 'SupportAgent') {
                navigate('/support')
            }
            else {
                navigate('/')
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div style={{ maxWidth: 360, margin: '60px auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <div style={{ marginTop: 20 }}>
                <h4>Quick login users</h4>
                <p>All passwords are: <b>password</b></p>
                <ul style={{ paddingLeft: 18 }}>
                    {predefinedUsers.map((u) => (
                        <li key={u.email} style={{ marginBottom: 6 }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setEmail(u.email)
                                    setPassword('password')
                                }}
                                style={{ marginRight: 8 }}
                            >
                                Use
                            </button>
                            <span>{u.role}: {u.email}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


