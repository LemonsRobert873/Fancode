import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center py-12 px-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-400">
                Something else
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl mx-auto">
               Watch all fancode matches for free 🔥
            </p>
        </header>
    );
};

export default Header;