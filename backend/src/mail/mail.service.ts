import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { Meeting } from '../meetings/schemas/meeting.schema';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private getTransporter() {
    return createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMeetingNotification(meeting: Meeting) {
    const to = process.env.NOTIFY_EMAIL;
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !to) {
      this.logger.warn('Email not configured (EMAIL_USER/EMAIL_PASS/NOTIFY_EMAIL) — skipping meeting notification');
      return;
    }

    try {
      await this.getTransporter().sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: `New meeting booked: ${meeting.name}`,
        text: [
          `${meeting.name} booked a meeting.`,
          `Email: ${meeting.email}`,
          meeting.phone ? `Phone: ${meeting.phone}` : null,
          `Date: ${meeting.date}`,
          `Time: ${meeting.time}`,
          meeting.message ? `Message: ${meeting.message}` : null,
        ].filter(Boolean).join('\n'),
      });
    } catch (error) {
      this.logger.error('Failed to send meeting notification email', error instanceof Error ? error.stack : error);
    }
  }
}
