import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem('adminToken'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('adminToken');
        const storedUser = sessionStorage.getItem('adminUser');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await adminApi.login(username, password);
            const { token: newToken, username: adminUsername } = response.data;

            sessionStorage.setItem('adminToken', newToken);
            sessionStorage.setItem('adminUser', JSON.stringify({ username: adminUsername }));

            setToken(newToken);
            setUser({ username: adminUsername });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            };
        }
    };

    const logout = () => {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUser');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
