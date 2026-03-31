/* eslint-disable @typescript-eslint/no-explicit-any */
type AuthLayoutProps = {
    children: any,
    title: string,
    subtitle: string
}

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
    const { children, title, subtitle } = props;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Branding & Header */}
                <div className="text-center">
                    <div className="flex justify-center">
                        {/* Replace with your actual Logo */}
                        <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            I
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {subtitle}
                    </p>
                </div>

                {/* The Card */}
                <div className="bg-white py-8 px-10 shadow-xl rounded-2xl border border-gray-100">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default AuthLayout;