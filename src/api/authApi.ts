export const loginUser = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5021/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        "credentials": "include",
    });

    if (!response.ok) throw new Error("Login failed");

    return response.json();
};

export const logoutUser = async (token: string) => {
    const response = await fetch("http://localhost:5021/api/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({}),
        "credentials": "include",

    });

    if (!response.ok) throw new Error("Logout failed");

    return response;
};

export const refreshToken = async () => {
    const response = await fetch("http://localhost:5021/api/auth/refresh", {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) throw new Error("Refresh token failed");

    return response.json();
};