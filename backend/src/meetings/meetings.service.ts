import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from './schemas/meeting.schema';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateMeetingDto) {
    const meeting = await new this.meetingModel(dto).save();
    void this.mailService.sendMeetingNotification(meeting);
    return meeting;
  }

  findAll() {
    return this.meetingModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
    const meeting = await this.meetingModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!meeting) throw new NotFoundException('Meeting not found');
    return meeting;
  }

  async remove(id: string) {
    const meeting = await this.meetingModel.findByIdAndDelete(id).exec();
    if (!meeting) throw new NotFoundException('Meeting not found');
    return { deleted: true };
  }
}
