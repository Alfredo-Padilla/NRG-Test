"use client";
import { FC, useEffect, useState } from 'react';
import './FloatingNotification.css';

interface FloatingNotificationProps {
    message: string;
}

const FloatingNotification: FC<FloatingNotificationProps> = ({ message }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [show]);

    // If the message is empty, don't show the notification
    if (!message) {
        return null;
    }
    
    return (
        <div className={`floating-notification shadow ${show ? '' : 'empty'}`}>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FloatingNotification;