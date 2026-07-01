export declare class UploadsController {
    upload(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
