import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'))
    const [role, setRole] = useState(() => localStorage.getItem('role'))
    const [user, setUser] = useState(() => {
        const u = localStorage.getItem('user')
        return u ? JSON.parse(u) : null
    })

    useEffect(() => {
        if (token) localStorage.setItem('token', token)
        else localStorage.removeItem('token')
    }, [token])

    useEffect(() => {
        if (role) localStorage.setItem('role', role)
        else localStorage.removeItem('role')
    }, [role])

    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user))
        else localStorage.removeItem('user')
    }, [user])

    const value = useMemo(
        () => ({ token, setToken, role, setRole, user, setUser, isAuthenticated: Boolean(token) }),
        [token, role, user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}


