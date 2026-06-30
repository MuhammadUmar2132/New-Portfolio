import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
export declare class MeetingsController {
    private readonly meetingsService;
    constructor(meetingsService: MeetingsService);
    create(dto: CreateMeetingDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").MeetingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").MeetingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").MeetingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
