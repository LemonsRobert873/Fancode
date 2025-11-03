
import React, { useState, useEffect } from 'react';
import { Match } from './types';
import Header from './components/Header';
import SpotlightCard from './components/SpotlightCard';
import MatchCard from './components/MatchCard';
import LoadingSkeletons from './components/LoadingSkeletons';
import FilterControls from './components/FilterControls';

const DATA_URL = 'https://raw.githubusercontent.com/Jitendra-unatti/fancode/refs/heads/main/data/fancode.json';

const App: React.FC = () => {
    const [allMatches, setAllMatches] = useState<Match[]>([]);
    const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
    const [spotlightMatch, setSpotlightMatch] = useState<Match | null>(null);
    const [tournaments, setTournaments] = useState<string[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<string>('All');
    const [selectedStatus, setSelectedStatus] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndRender = async () => {
            try {
                const res = await fetch(DATA_URL);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                let fetchedMatches: Match[] = Array.isArray(data.matches) ? data.matches : [];

                fetchedMatches.sort((a, b) => {
                    const aIsLive = a.status?.toUpperCase() === 'LIVE';
                    const bIsLive = b.status?.toUpperCase() === 'LIVE';
                    if (aIsLive && !bIsLive) return -1;
                    if (!aIsLive && bIsLive) return 1;
                    return 0;
                });

                const firstLiveMatch = fetchedMatches.find(m => m.status?.toUpperCase() === 'LIVE');
                if (firstLiveMatch) {
                    setSpotlightMatch(firstLiveMatch);
                }
                
                setAllMatches(fetchedMatches);

                const uniqueTournaments = [...new Set(fetchedMatches.map(m => m.tournament).filter(Boolean))];
                setTournaments(uniqueTournaments);

            } catch (err) {
                console.error("Failed to load match data:", err);
                setError("Could not load matches. Please check your connection and try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAndRender();
    }, []);

    useEffect(() => {
        let tempMatches = [...allMatches];

        if (selectedStatus === 'Live') {
            tempMatches = tempMatches.filter(m => m.status?.toUpperCase() === 'LIVE');
        } else if (selectedStatus === 'Upcoming') {
            tempMatches = tempMatches.filter(m => m.status?.toUpperCase() !== 'LIVE');
        }

        if (selectedTournament !== 'All') {
            tempMatches = tempMatches.filter(m => m.tournament === selectedTournament);
        }
        
        if (spotlightMatch) {
            tempMatches = tempMatches.filter(m => m.match_id !== spotlightMatch.match_id);
        }

        setFilteredMatches(tempMatches);
    }, [allMatches, selectedTournament, selectedStatus, spotlightMatch]);

    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto px-4 pb-12">
                {spotlightMatch && <SpotlightCard match={spotlightMatch} />}

                <div className="mt-16 mb-8 px-2">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-100">Live & Upcoming</h2>
                    <div className="w-20 h-1 mt-2 bg-gradient-to-r from-sky-500 to-amber-500 rounded-full"></div>
                </div>

                <FilterControls 
                    tournaments={tournaments}
                    selectedTournament={selectedTournament}
                    selectedStatus={selectedStatus}
                    onTournamentChange={setSelectedTournament}
                    onStatusChange={setSelectedStatus}
                />

                <div id="matches-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        <LoadingSkeletons />
                    ) : error ? (
                        <p className="col-span-full text-center text-red-400">{error}</p>
                    ) : (allMatches.length === 0 && !spotlightMatch) ? (
                         <p className="col-span-full text-center text-slate-400">No matches available right now.</p>
                    ) : (filteredMatches.length === 0) ? (
                         <p className="col-span-full text-center text-slate-400">No matches found for the selected filters.</p>
                    ) : (
                        filteredMatches.map((match, index) => (
                            <MatchCard key={match.match_id || index} match={match} index={index} />
                        ))
                    )}
                </div>
            </main>
        </>
    );
};

export default App;
