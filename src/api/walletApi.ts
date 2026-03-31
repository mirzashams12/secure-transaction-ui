import { fetchWithAuth } from "./baseApi";

export const getMyWallets = async () => {
    const res = await fetchWithAuth(
        "http://localhost:5021/api/wallet"
    );
    return res.json();
};

export const createWallet = async (name: string) => {
    const res = await fetchWithAuth(
        "http://localhost:5021/api/wallet",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        }
    );
    return res.json();
};