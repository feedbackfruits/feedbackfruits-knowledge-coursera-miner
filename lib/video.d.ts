import { Doc } from 'feedbackfruits-knowledge-engine';
export declare type Video = {
    co_url: string;
    video_url: string;
    transcription: string;
    part: string;
};
export declare function videoToDocs(video: Video): Promise<Doc[]>;
