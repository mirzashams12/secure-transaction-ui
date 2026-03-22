/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken, setAccessToken } from "../auth/tokenStore";
import { refreshToken } from "./authApi";

export const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = getAccessToken();

    let res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: token ? `Bearer ${token}` : ""
        },
        credentials: "include"
    });

    // 🔥 If token expired → try refresh
    if (res.status === 401) {
        try {
            const data = await refreshToken();

            // ✅ update token
            setAccessToken(data.token);

            // 🔁 retry original request
            res = await fetch(url, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${data.token}`
                },
                credentials: "include"
            });
        } catch (err: any) {
            // ❌ refresh failed → logout scenario
            setAccessToken(null);
            throw new Error("Session expired: " + err.message);
        }
    }

    return res;
};