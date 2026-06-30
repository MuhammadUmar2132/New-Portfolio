import { Document } from 'mongoose';
export type MeetingDocument = Meeting & Document;
export declare class Meeting {
    name: string;
    email: string;
    phone?: string;
    date: string;
    time: string;
    message: string;
    status: string;
}
export declare const MeetingSchema: import("mongoose").Schema<Meeting, import("mongoose").Model<Meeting, any, any, any, any, any, Meeting>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Meeting, Document<unknown, {}, Meeting, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Meeting, Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Meeting, Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Meeting, Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    date?: import("mongoose").SchemaDefinitionProperty<string, Meeting, Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    time?: import("mongoose").SchemaDefinitionProperty<string, Meeting, Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    message?: import("mongoose").SchemaDefinitionProperty<string, Meeting, Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Meeting, Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Meeting>;
