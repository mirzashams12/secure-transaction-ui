/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { createWallet, getMyWallets } from '../api/walletApi';
import { useAuth } from '../hooks/useAuth';

interface Wallet {
    id: string;
    name: string;
    balance: number;
    createdAt: Date;
}

export default function Wallet() {
    const { token } = useAuth();
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', address: '' });

    const load = async () => {
        if (!token) return;

        const result = await getMyWallets();
        return result;
    };

    useEffect(() => {
        load().then(setWallets);
    }, [token]);

    const handleCreateWallet = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return;

        createWallet(formData.name).then(() => {
            load().then(setWallets);
            setFormData({ name: '', address: '' });
            setShowForm(false);
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Wallets</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {showForm ? 'Cancel' : 'Create Wallet'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleCreateWallet} className="bg-white p-6 rounded-lg shadow mb-8">
                        <input
                            type="text"
                            name="name"
                            placeholder="Wallet Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create
                        </button>
                    </form>
                )}

                {wallets.length === 0 ? (
                    <p className="text-center text-gray-500">No wallets yet. Create one to get started!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wallets.map((wallet, index) => (
                            <div key={wallet.id} className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Wallet #{index + 1}</h3>
                                <p className="text-2xl font-bold text-blue-600 mb-4">${wallet.balance.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}