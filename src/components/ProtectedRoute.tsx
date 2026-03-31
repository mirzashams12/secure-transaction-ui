/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: any) {
    const { token, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // or spinner
    }

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}