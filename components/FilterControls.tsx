import React from 'react';

interface FilterControlsProps {
    tournaments: string[];
    selectedTournament: string;
    selectedStatus: string;
    onTournamentChange: (tournament: string) => void;
    onStatusChange: (status: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
    tournaments,
    selectedTournament,
    selectedStatus,
    onTournamentChange,
    onStatusChange,
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 px-2">
            <div className="flex-1">
                <label htmlFor="tournament-filter" className="block text-sm font-medium text-slate-400 mb-2">
                    Filter by Tournament
                </label>
                <select
                    id="tournament-filter"
                    value={selectedTournament}
                    onChange={(e) => onTournamentChange(e.target.value)}
                    className="custom-select w-full bg-slate-800/60 border border-slate-700 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                >
                    <option value="All">All Tournaments</option>
                    {tournaments.map((tournament) => (
                        <option key={tournament} value={tournament}>
                            {tournament}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-1">
                <label htmlFor="status-filter" className="block text-sm font-medium text-slate-400 mb-2">
                    Filter by Status
                </label>
                <select
                    id="status-filter"
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="custom-select w-full bg-slate-800/60 border border-slate-700 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                >
                    <option value="All">All</option>
                    <option value="Live">Live</option>
                    <option value="Upcoming">Upcoming</option>
                </select>
            </div>
        </div>
    );
};

export default FilterControls;