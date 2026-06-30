export declare class CreateProjectDto {
    title: string;
    description: string;
    longDescription?: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    category: string;
    featured: boolean;
    order: number;
}
