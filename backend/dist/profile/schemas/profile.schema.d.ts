import { HydratedDocument } from 'mongoose';
export type ProfileDocument = HydratedDocument<Profile>;
export declare class Stat {
    value: string;
    label: string;
}
export declare const StatSchema: import("mongoose").Schema<Stat, import("mongoose").Model<Stat, any, any, any, any, any, Stat>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Stat, import("mongoose").Document<unknown, {}, Stat, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Stat & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    value?: import("mongoose").SchemaDefinitionProperty<string, Stat, import("mongoose").Document<unknown, {}, Stat, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Stat & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    label?: import("mongoose").SchemaDefinitionProperty<string, Stat, import("mongoose").Document<unknown, {}, Stat, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Stat & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Stat>;
export declare class Profile {
    avatarUrl?: string;
    stats?: Stat[];
}
export declare const ProfileSchema: import("mongoose").Schema<Profile, import("mongoose").Model<Profile, any, any, any, any, any, Profile>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Profile, import("mongoose").Document<unknown, {}, Profile, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Profile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    avatarUrl?: import("mongoose").SchemaDefinitionProperty<string, Profile, import("mongoose").Document<unknown, {}, Profile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    stats?: import("mongoose").SchemaDefinitionProperty<Stat[], Profile, import("mongoose").Document<unknown, {}, Profile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Profile>;
