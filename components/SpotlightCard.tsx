import React from 'react';
import { Match } from '../types.ts';

interface SpotlightCardProps {
    match: Match;
    preferredStream: string;
}

const GenerateButtons: React.FC<{ match: Match; classes: string; preferredStream: string }> = ({ match, classes, preferredStream }) => {
    const streams = {
        ...(match.STREAMING_CDN || {}),
        adfree_stream: match.adfree_stream,
        dai_stream: match.dai_stream
    };
    
    const buttons: { key: string; element: React.ReactElement }[] = [];
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

const SpotlightCard: React.FC<SpotlightCardProps> = ({ match, preferredStream }) => {
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
                    <GenerateButtons match={match} classes="text-sm px-5 py-2.5 rounded-lg" preferredStream={preferredStream} />
                </div>
            </div>
        </div>
    );
};

export default SpotlightCard;