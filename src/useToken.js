import { useState, useEffect, useCallback } from "react";

const useToken = () => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || "");
    const [role, setRole] = useState(() => localStorage.getItem('role') || "");
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setIsAuthenticated(false);
            setRole("");
        }
    }, [token]);

    const setTokenAndRole = useCallback((newToken, newRole) => {
        setToken(newToken);
        setRole(newRole);
        localStorage.setItem('role', newRole);
    }, []);

    const clearToken = useCallback(() => {
        setToken("");
        setRole("");
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }, []);

    const checkAuthStatus = useCallback(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        if (storedToken !== token) {
            setToken(storedToken || "");
            setRole(storedRole || "");
        }
    }, [token]);

    return {
        token,
        setTokenAndRole,
        clearToken,
        isAuthenticated,
        checkAuthStatus,
        role
    };
};

export default useToken;