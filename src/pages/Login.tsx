/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { loginUser } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

export default function Login() {
    const { token, login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // General login error
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!email || !password) {
                setError('Please fill in all fields');
                setLoading(false);
                return;
            }

            const data = await loginUser(email, password);
            login(data.token);
            navigate("/dashboard");
        } catch (err: any) {
            console.error('Login error:', err);
            // Industrial standard: Don't tell them IF the email or password was wrong specifically for security
            setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <AuthLayout title="Welcome Back" subtitle="Log in to manage your industrial systems">

            {/* General Error Message - Styled like Register error list */}
            {error && (
                <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm font-medium text-left animate-in fade-in slide-in-from-top-1">
                    ⚠️ {error}
                </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                {/* Email Field */}
                <div className="flex flex-col items-start">
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        required
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none 
                            ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                        placeholder="name@company.com"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                            if (error) setError(''); // Clear error when user types
                        }}
                    />
                </div>

                {/* Password Field */}
                <div className="flex flex-col items-start">
                    <div className="w-full flex justify-between items-center mb-1.5 ml-1">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <button
                            type="button"
                            className="text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                            Forgot?
                        </button>
                    </div>
                    <input
                        type="password"
                        value={password}
                        required
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none 
                            ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                        placeholder="••••••••"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                            if (error) setError('');
                        }}
                    />
                </div>

                {/* Submit Button with Spinner */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        "Sign In"
                    )}
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="ml-1 text-blue-600 font-bold hover:underline"
                        >
                            Create one
                        </button>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}