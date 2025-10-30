export type PexelsVideo = {
    avg_color: string | null;
    duration: number;
    full_res: string | null;
    height: number;
    id: number;
    image: string;
    tags: string[];
    url: string;
    user: {
        id: number;
        name: string;
        url: string;
    };
    video_files: {
      link: string;
      quality: string;
      file_type: string;
    }[];
    video_pictures: {}[];
    width: number;
}
