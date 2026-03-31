/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserDto } from "../models/UserModel";

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

export const registerUser = async (userDto: UserDto) => {
    try {
        const res = await fetch(
            "http://localhost:5021/api/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userDto),
            }
        );

        // Check if the response has content before parsing
        const isJson = res.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await res.json() : await res.text();

        if (!res.ok) {
            // Normalize the error format
            // If data is just a string "User already exists", we wrap it
            if (typeof data === 'string') {
                throw { message: data };
            }
            throw data;
        }

        return data;
    } catch (err: any) {
        // Log locally for debugging, then re-throw for the UI to catch
        console.error("API Error:", err);
        throw err;
    }
}