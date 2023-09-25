import React, { useEffect, useState } from "react";

export default function Alert({ message, color }) {
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (message) {
            setShowFlash(true);
            setTimeout(() => {
                setShowFlash(false);
            }, 3000);
        }
    }, [message]);
    return (
        <>
            {showFlash && (
                <div className="toast z-[999] toast-top toast-center max-w-md w-full top-12 lg:top-8">
                    <div className={`alert ${color} rounded-md`}>
                        <span>{message}</span>
                    </div>
                </div>
            )}
        </>
    );
}
