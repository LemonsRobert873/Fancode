
export interface Match {
    match_id: number;
    title: string;
    tournament: string;
    status: string;
    image: string;
    language: string;
    STREAMING_CDN?: {
        [key: string]: string;
    };
    adfree_stream?: string;
    dai_stream?: string;
}
