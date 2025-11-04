import React from 'react';
import { Match } from '../types';
import { useInteractiveCard } from '../hooks/useInteractiveCard';

interface MatchCardProps {
    match: Match;
    index: number;
    preferredStream: string;
}

const getTeamNames = (title: string): { team1: string; team2: string } | null => {
    const parts = title.split(/\s+vs\s+/i);
    if (parts.length === 2) {
        return { team1: parts[0].trim(), team2: parts[1].trim() };
    }
    return null;
};

const GenerateButtons: React.FC<{ match: Match; classes: string; preferredStream: string }> = ({ match, classes, preferredStream }) => {
    const streams = {
        ...(match.STREAMING_CDN || {}),
        adfree_stream: match.adfree_stream,
        dai_stream: match.dai_stream
    };
    
    const buttons: { key: string, element: React.ReactElement }[] = [];
    const id = encodeURIComponent(String(match.match_id ?? ''));

    for (const [key, value] of Object.entries(streams)) {
        if (value && value !== "Unavailable" && key.toLowerCase() !== 'language' && key !== 'Primary_Playback_URL') {
            const label = key.replace(/_/g, ' ').replace(/(cdn|stream)/i, '').trim().toUpperCase() || 'STREAM';
            const href = `./player.html?id=${id}&cdn=${encodeURIComponent(key)}`;
            const isPreferred = key === preferredStream;
            
            buttons.push({
                key: key,
                element: (
                    <a href={href} key={key} className={`watch-btn text-center text-black font-semibold ${classes} ${isPreferred ? 'preferred-btn' : ''} inline-flex items-center justify-center`}>
                        {isPreferred && <i className="fas fa-star mr-1.5 text-xs"></i>}
                        {label}
                    </a>
                )
            });
        }
    }

    if (buttons.length === 0) {
        return <p className="text-xs text-slate-500">Links coming soon...</p>;
    }
    
    buttons.sort((a, b) => {
        if (a.key === preferredStream) return -1;
        if (b.key === preferredStream) return 1;
        return 0;
    });

    return <>{buttons.map(b => b.element)}</>;
};


const MatchCard: React.FC<MatchCardProps> = ({ match, index, preferredStream }) => {
    const cardRef = useInteractiveCard<HTMLDivElement>();
    const isLive = match.status?.toUpperCase() === 'LIVE';
    const imgSrc = match.image || 'https://fancode.com/skillup-uploads/cms-media/Cricket_Fallback_Old_match-card.jpg';
    const teams = getTeamNames(match.title);

    return (
        <div 
            ref={cardRef} 
            className="match-card rounded-xl overflow-hidden flex flex-col"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="card-glow"></div>
            <div className="relative rounded-t-xl overflow-hidden">
                <img src={imgSrc} alt={match.title} className="w-full h-48 object-cover" />
                
                <div className="details-overlay absolute inset-0 p-4 flex flex-col justify-end text-left">
                    {teams ? (
                        <div>
                            <p className="font-semibold text-white">{teams.team1}</p>
                            <p className="text-xs text-slate-300 my-0.5">vs</p>
                            <p className="font-semibold text-white">{teams.team2}</p>
                        </div>
                    ) : (
                        <h4 className="font-bold text-white truncate">{match.title}</h4>
                    )}
                    {match.language && <p className="text-xs text-slate-300 mt-2">
                        <i className="fas fa-globe mr-1.5 opacity-70"></i>{match.language}
                    </p>}
                </div>

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
                        <GenerateButtons match={match} classes="text-xs px-3 py-2 rounded-md" preferredStream={preferredStream} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;