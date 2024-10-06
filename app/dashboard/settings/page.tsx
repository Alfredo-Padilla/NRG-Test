"use client";
import { useState, useEffect } from "react";


export default function Settings() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changePassword = async () => {
        if (password === confirmPassword) {
            try {
                const response = await fetch('http://178.33.249.178:8002'+'/api/auth/change_password/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password: password
                    })
                });
                if (response.ok) {
                    alert('Password changed successfully');
                } else {
                    alert('Failed to change password');
                }
            } catch (error) {
                console.error('Error changing password:', error);
            }
        }
    }

    return (
      <div className="dashboard-page flex flex-col items-center justify-center">
        <h1>Settings</h1>
        
        <div className="shadow bg-white p-4">
            <div className="flex flex-col justify-start gap-4">
                <h2 className="text-left">Change password</h2>
                <input className='p-2' type="password" placeholder="New password" onChange={(e) => setPassword(e.target.value)} />
                <input className='p-2' type="password" placeholder="Confirm new password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className='button' onClick={changePassword}>Change password</button>
            </div>
        </div>
      </div>
    );
}
    