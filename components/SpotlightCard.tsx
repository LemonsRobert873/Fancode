
import React from 'react';
import { Match } from '../types';

interface SpotlightCardProps {
    match: Match;
}

const GenerateButtons: React.FC<{ match: Match; classes: string }> = ({ match, classes }) => {
    const streams = {
        ...(match.STREAMING_CDN || {}),
        adfree_stream: match.adfree_stream,
        dai_stream: match.dai_stream
    };
    
    // Fix: Used React.ReactElement instead of JSX.Element to resolve namespace error.
    const buttons: React.ReactElement[] = [];
    const id = encodeURIComponent(String(match.match_id ?? ''));

    for (const [key, value] of Object.entries(streams)) {
        if (value && value !== "Unavailable" && key.toLowerCase() !== 'language' && key !== 'Primary_Playback_URL') {
            const label = key.replace(/_/g, ' ').replace(/(cdn|stream)/i, '').trim().toUpperCase() || 'STREAM';
            const href = `./player.html?id=${id}&cdn=${encodeURIComponent(key)}`;
            buttons.push(
                <a href={href} key={key} className={`watch-btn text-center text-black font-semibold ${classes}`}>
                    {label}
                </a>
            );
        }
    }

    if (buttons.length === 0) {
        return <p className="text-xs text-slate-500">Links coming soon...</p>;
    }

    return <>{buttons}</>;
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({ match }) => {
    const imgSrc = match.image || 'https://fancode.com/skillup-uploads/cms-media/Cricket_Fallback_Old_match-card.jpg';

    return (
        <div className="spotlight-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center gap-8 p-6 md:p-8">
            <div className="relative rounded-lg overflow-hidden aspect-video">
                <img src={imgSrc} alt={match.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="spotlight-live-badge absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-lg">
                    <i className="fas fa-circle text-xs mr-1.5 animate-ping absolute opacity-75"></i>
                    <i className="fas fa-circle text-xs mr-1.5"></i>
                    LIVE NOW
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-amber-400 font-semibold text-sm mb-1">{match.tournament || ''}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{match.title || 'Live Match'}</h2>
                <p className="text-slate-400 text-sm mb-6">{match.language || ''}</p>
                <div className="flex flex-wrap gap-3">
                    <GenerateButtons match={match} classes="text-sm px-5 py-2.5 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default SpotlightCard;
