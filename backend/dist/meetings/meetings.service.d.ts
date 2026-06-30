import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from './schemas/meeting.schema';
import { CreateMeetingDto } from './dto/create-meeting.dto';
export declare class MeetingsService {
    private meetingModel;
    constructor(meetingModel: Model<MeetingDocument>);
    create(dto: CreateMeetingDto): Promise<import("mongoose").Document<unknown, {}, MeetingDocument, {}, import("mongoose").DefaultSchemaOptions> & Meeting & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, MeetingDocument, {}, import("mongoose").DefaultSchemaOptions> & Meeting & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<import("mongoose").Document<unknown, {}, MeetingDocument, {}, import("mongoose").DefaultSchemaOptions> & Meeting & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
