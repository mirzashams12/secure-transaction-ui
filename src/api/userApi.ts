import { fetchWithAuth } from "./baseApi";

export const getUserProfile = async () => {
    const res = await fetchWithAuth(
        "http://localhost:5021/api/users/profile"
    );

    if (!res.ok) throw new Error("Failed to fetch profile");

    return res.json();
};