'use client';
import { validatePassword } from '@/app/server/utils/Password';
import React, { useState } from 'react';

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
    return function PasswordProtectedComponent() {
        const [password, setPassword] = useState('');
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [error, setError] = useState('');

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const isValid = await validatePassword(password);

            if (isValid) {
                setIsAuthenticated(true);
                setError('');
            } else {
                setError("I don't know you...");
            }
        };

        if (isAuthenticated) {
            return <WrappedComponent />;
        }

        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-black" >
                <div className="bg-gray-900 border-[1px] border-opacity-50 border-teal-500 p-8 rounded-lg shadow-md w-full max-w-md mx-4" >
                    <h2 className="text-2xl font-bold text-center mb-6" > Howdy, Stranger! </h2>

                    <form onSubmit={handleSubmit} className="space-y-4" >
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="How you doing?"
                                className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {
                            error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" >
                                    {error}
                                </div>
                            )
                        }

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Howdy Back
                        </button>
                    </form>
                </div>
            </div>
        );
    };
};

export default WithAuth;