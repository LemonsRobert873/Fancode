
import React from 'react';

const LoadingSkeletons: React.FC = () => {
    return (
        <>
            <div className="h-64 bg-slate-800/50 rounded-xl animate-pulse"></div>
            <div className="h-64 bg-slate-800/50 rounded-xl animate-pulse hidden md:block"></div>
            <div className="h-64 bg-slate-800/50 rounded-xl animate-pulse hidden lg:block"></div>
        </>
    );
};

export default LoadingSkeletons;
