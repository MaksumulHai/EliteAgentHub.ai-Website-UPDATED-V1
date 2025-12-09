
import React, { useState, useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white transition-all duration-300 transform";
    const typeClasses = {
        success: "bg-green-500",
        error: "bg-red-500"
    };
    const visibilityClasses = visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0";

    return (
        <div className={`${baseClasses} ${typeClasses[type]} ${visibilityClasses}`}>
            <div className="flex items-center">
                <p>{message}</p>
                <button onClick={onClose} className="ml-4 font-bold text-xl">&times;</button>
            </div>
        </div>
    );
};

export default Toast;
