import { Meeting } from '../meetings/schemas/meeting.schema';
export declare class MailService {
    private readonly logger;
    private getTransporter;
    sendMeetingNotification(meeting: Meeting): Promise<void>;
}
