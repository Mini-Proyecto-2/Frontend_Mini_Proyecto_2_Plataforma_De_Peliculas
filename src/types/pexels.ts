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
    id: number;
    quality: string;
    file_type: string;
    width: number | null;
    height: number | null;
    link: string;
  }[];
  video_pictures: {
    id: number;
    picture: string;
    nr: number;
  }[];
  width: number;
}
