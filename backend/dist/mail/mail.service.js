"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
let MailService = MailService_1 = class MailService {
    constructor() {
        this.logger = new common_1.Logger(MailService_1.name);
    }
    getTransporter() {
        return (0, nodemailer_1.createTransport)({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    async sendMeetingNotification(meeting) {
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
        }
        catch (error) {
            this.logger.error('Failed to send meeting notification email', error instanceof Error ? error.stack : error);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map