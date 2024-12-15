import React, { useState } from "react";

function Home() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGreet = async () => {
        if (!name.trim()) {
            setMessage("Please enter your name");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5001/health", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Failed to connect to Flask:", error);
            setMessage("Error: Unable to connect to the backend.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <div className="container mx-auto max-w-md">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="card-title text-2xl font-bold text-center mb-6">
                            Electron + React + Flask
                        </h1>
                        <div className="form-control gap-4">
                            <div className="join w-full">
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered join-item flex-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button
                                    className={`btn btn-primary join-item ${isLoading ? 'loading' : ''}`}
                                    onClick={handleGreet}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Greet'}
                                </button>
                            </div>
                            {message && (
                                <div className={`alert ${message.startsWith('Error') ? 'alert-error' : 'alert-success'
                                    } shadow-lg`}>
                                    <span>{message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;