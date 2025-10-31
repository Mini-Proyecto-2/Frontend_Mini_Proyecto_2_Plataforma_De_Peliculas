export interface Comment {
    _id: string;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string
    },
    moviePexelsId: string,
    description: string,
    createdAt: string,
}