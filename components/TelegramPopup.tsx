
import React, { useState, useEffect } from 'react';

const POPUP_KEY = 'telegramPopupDismissed';

const TelegramPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(POPUP_KEY)) {
            return;
        }

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const dismissPopup = () => {
        setIsVisible(false);
        localStorage.setItem(POPUP_KEY, 'true');
    };
    
    const handleJoinClick = () => {
        setTimeout(dismissPopup, 500);
    }

    return (
        <div className={`popup-overlay fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 ${isVisible ? 'show' : ''}`}>
            <div className="popup-card w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 shadow-2xl shadow-sky-500/10">
                <div className="p-8 text-center">
                    <div className="text-5xl mb-4 text-sky-400"><i className="fab fa-telegram-plane"></i></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Join Our Community</h3>
                    <p className="text-slate-400 mb-6">
                        Get instant match links, updates, and clips directly on Telegram.
                    </p>
                    <div className="flex flex-col gap-3">
                        <a 
                            href="https://t.me/one8ch1raggg" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={handleJoinClick}
                            className="w-full text-center px-6 py-3 rounded-lg font-semibold text-black bg-sky-400 hover:bg-sky-300 transition-all duration-300 transform hover:scale-105"
                        >
                            <i className="fas fa-rocket mr-2"></i>Join Now
                        </a>
                        <button 
                            onClick={dismissPopup}
                            className="w-full text-center px-6 py-3 rounded-lg font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors duration-300"
                        >
                            Already Joined
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TelegramPopup;
