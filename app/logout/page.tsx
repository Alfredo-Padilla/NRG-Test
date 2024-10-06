"use client";
import { FC, useEffect } from 'react';

const Logout: FC = () => {
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }, []);

    return null;
};

export default Logout;