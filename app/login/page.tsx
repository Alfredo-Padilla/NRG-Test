"use client";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      console.log(username, password);
      const apiURL = process.env.API_URL;
  
      const response = await fetch('http://178.33.249.178:8002'+'/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage(`Login successful`);

        //wait 1 seconds
        await new Promise(r => setTimeout(r, 1000));

        // Save data in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);

        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        setMessage('Login failed');
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gray-light">
          <div className="p-8 bg-white">
            <h1 className="text-4xl font-bold text-orange-dark">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border"
              />
              <button type="submit" className="button">
                Login
              </button>
            </form>

            <div className="floating-notification shadow">
                {message && <p>{message}</p>}
            </div>
          </div>
        </main>
      </div>
    );
  }