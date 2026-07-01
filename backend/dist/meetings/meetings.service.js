"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const meeting_schema_1 = require("./schemas/meeting.schema");
const mail_service_1 = require("../mail/mail.service");
let MeetingsService = class MeetingsService {
    constructor(meetingModel, mailService) {
        this.meetingModel = meetingModel;
        this.mailService = mailService;
    }
    async create(dto) {
        const meeting = await new this.meetingModel(dto).save();
        void this.mailService.sendMeetingNotification(meeting);
        return meeting;
    }
    findAll() {
        return this.meetingModel.find().sort({ createdAt: -1 }).exec();
    }
    async updateStatus(id, status) {
        const meeting = await this.meetingModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
        if (!meeting)
            throw new common_1.NotFoundException('Meeting not found');
        return meeting;
    }
    async remove(id) {
        const meeting = await this.meetingModel.findByIdAndDelete(id).exec();
        if (!meeting)
            throw new common_1.NotFoundException('Meeting not found');
        return { deleted: true };
    }
};
exports.MeetingsService = MeetingsService;
exports.MeetingsService = MeetingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(meeting_schema_1.Meeting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService])
], MeetingsService);
//# sourceMappingURL=meetings.service.js.map