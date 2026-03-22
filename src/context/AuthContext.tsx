/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import { setAccessToken } from "../auth/tokenStore";
import { refreshToken } from "../api/authApi";

type AuthContextType = {
    token: string | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const refresh = async () => {
            try {
                const data = await refreshToken();
                setToken(data.token);
            } catch {
                setToken(null);
            } finally {
                setIsLoading(false); // 🔥 IMPORTANT
            }
        };

        refresh();
    }, []);

    const login = (token: string) => {
        setToken(token);
        setAccessToken(token);
    };

    const logout = () => {
        setToken(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, isLoading, login, logout }
        }>
            {children}
        </AuthContext.Provider>
    );
};