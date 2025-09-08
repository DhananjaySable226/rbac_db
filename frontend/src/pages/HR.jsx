import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function HR() {
    const { token } = useAuth()
    const [message, setMessage] = useState('')

    useEffect(() => {
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
        axios
            .get(`${baseURL}/hr`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setMessage(res.data.message))
            .catch((err) => setMessage(err.response?.data?.message || 'Error'))
    }, [token])

    return (
        <div style={{ padding: 24 }}>
            <h2>HR Dashboard</h2>
            <p>{message}</p>
        </div>
    )
}


