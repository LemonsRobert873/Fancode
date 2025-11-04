import React, { useState } from 'react';

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    availableStreamTypes: string[];
    preferredStream: string;
    onPreferredStreamChange: (streamType: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
    searchQuery, 
    onSearchChange, 
    availableStreamTypes, 
    preferredStream, 
    onPreferredStreamChange 
}) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <header className="text-center py-12 px-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-400">
                Something else
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl mx-auto">
               Watch all fancode matches for free 🔥
            </p>

            <div className="mt-8 max-w-lg mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="fas fa-search text-slate-500"></i>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by title or tournament..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="search-input w-full bg-slate-800/60 border border-slate-700 text-slate-200 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        aria-label="Search for matches"
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-200"
                    aria-label="Open settings"
                    aria-expanded={isSettingsOpen}
                >
                    <i className={`fas fa-cog transition-transform duration-300 ${isSettingsOpen ? 'rotate-90' : ''}`}></i>
                    <span className="ml-2">Settings</span>
                </button>
            </div>

            <div className={`settings-panel ${isSettingsOpen ? 'open' : ''} max-w-lg mx-auto`}>
                <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 mt-2">
                    <label htmlFor="stream-preference" className="block text-sm font-medium text-slate-300 mb-2 text-left">
                        Preferred Stream Type
                    </label>
                    <select
                        id="stream-preference"
                        value={preferredStream}
                        onChange={(e) => onPreferredStreamChange(e.target.value)}
                        className="custom-select w-full bg-slate-900/80 border border-slate-600 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                    >
                        <option value="None">None</option>
                        {availableStreamTypes.map((streamType) => (
                            <option key={streamType} value={streamType}>
                                {streamType.replace(/_/g, ' ').replace(/(cdn|stream)/i, '').trim().toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-2 text-left">Your preferred stream will be highlighted and appear first.</p>
                </div>
            </div>
        </header>
    );
};

export default Header;