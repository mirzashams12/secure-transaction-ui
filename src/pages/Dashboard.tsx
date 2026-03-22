/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserProfile } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

export default function Dashboard() {
    const { token, logout } = useAuth();
    const [data, setData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            if (!token) return;

            const result = await getUserProfile();
            setData(result);
        };

        load();
    }, [token]);

    const handleLogout = async () => {
        await logoutUser(token || ""); // 🔥 call backend to clear cookie
        await logout();          // 🔥 calls backend (clears cookie)
        navigate("/");           // 🔁 redirect to login
    };

    return (
        <div>
            <h2>Dashboard</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}