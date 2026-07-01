import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfileService {
    private profileModel;
    constructor(profileModel: Model<ProfileDocument>);
    get(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Profile, {}, import("mongoose").DefaultSchemaOptions> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Profile, {}, import("mongoose").DefaultSchemaOptions> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | {
        avatarUrl: any;
    }>;
    update(dto: UpdateProfileDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Profile, {}, import("mongoose").DefaultSchemaOptions> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Profile, {}, import("mongoose").DefaultSchemaOptions> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
