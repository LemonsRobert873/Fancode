import React from 'react';
import { Match } from '../types';
import { useInteractiveCard } from '../hooks/useInteractiveCard';

interface MatchCardProps {
    match: Match;
    index: number;
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


const MatchCard: React.FC<MatchCardProps> = ({ match, index }) => {
    const cardRef = useInteractiveCard<HTMLDivElement>();
    const isLive = match.status?.toUpperCase() === 'LIVE';
    const imgSrc = match.image || 'https://fancode.com/skillup-uploads/cms-media/Cricket_Fallback_Old_match-card.jpg';

    return (
        <div 
            ref={cardRef} 
            className="match-card rounded-xl overflow-hidden flex flex-col"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="relative">
                <div className="card-glow"></div>
                <img src={imgSrc} alt={match.title} className="w-full h-48 object-cover" />
                {isLive && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        LIVE
                    </span>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="text-amber-500 text-xs font-semibold mb-1">{match.tournament || ''}</p>
                    <h3 className="text-lg font-bold text-slate-100">{match.title || 'Match Title'}</h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex flex-wrap gap-2">
                        <GenerateButtons match={match} classes="text-xs px-3 py-2 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;