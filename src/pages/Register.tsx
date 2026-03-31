/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerUser } from "../api/authApi";

type FormErrors = {
    Name?: string[];
    Email?: string[];
    Password?: string[];
    ConfirmPassword?: string[];
    General?: string[];
};

const RegisterUser: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Map lowercase input names to Capitalized error keys for clearing
        const errorKey = (name.charAt(0).toUpperCase() + name.slice(1)) as keyof FormErrors;
        if (errors[errorKey]) {
            setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const newErrors: FormErrors = {};
        if (form.password.length < 8) newErrors.Password = ["Password must be at least 8 characters"];
        if (form.password !== form.confirmPassword) newErrors.ConfirmPassword = ["Passwords do not match"];

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            await registerUser({ name: form.name, email: form.email, password: form.password });
            setSuccessMsg("Account created! Redirecting to login...");
            setTimeout(() => navigate("/"), 2000);
        } catch (err: any) {
            if (err === "User already exists" || err.message === "User already exists") {
                newErrors.Email = ["This email is already registered."];
            }
            // 2. Handle object-based validation errors (e.g., from Laravel/Node validation)
            else if (err.errors) {
                setErrors(err.errors);
                return;
            }
            // 3. Fallback for generic server errors
            else {
                newErrors.General = ["An unexpected error occurred. Please try again."];
            }
            setErrors(newErrors);
        } finally {
            setLoading(false);
        }
    };

    const ErrorText = ({ field, center = false }: { field: keyof FormErrors, center?: boolean }) => (
        errors[field] ? (
            <p className={`mt-1.5 text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1 ${center ? 'text-center' : 'text-left'}`}>
                {errors[field]![0]}
            </p>
        ) : null
    );

    return (
        <AuthLayout title="Create Account" subtitle="Enter your details to get started">
            {successMsg && (
                <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium text-center">
                    {successMsg}
                </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="flex flex-col items-start">
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">Full Name</label>
                    <input
                        name="name"
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none 
                        ${errors.Name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <ErrorText field="Name" />
                </div>

                {/* Email */}
                <div className="flex flex-col items-start">
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="name@company.com"
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none 
                        ${errors.Email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <ErrorText field="Email" />
                </div>

                {/* Passwords Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col items-start">
                        <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className={`w-full px-4 py-3 rounded-xl border transition-all outline-none 
                            ${errors.Password ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">Confirm</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className={`w-full px-4 py-3 rounded-xl border transition-all outline-none 
                            ${errors.ConfirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <ErrorText field="ConfirmPassword" />
                    </div>
                </div>

                {/* Password Error - Centered as requested */}
                <ErrorText field="Password" center={false} />
                <ErrorText field="General" center={true} />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        "Create Account"
                    )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-2">
                    Already have an account?
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="ml-1 text-blue-600 font-bold hover:underline"
                    >
                        Login
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
};

export default RegisterUser;