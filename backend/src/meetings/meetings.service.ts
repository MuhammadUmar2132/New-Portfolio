import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from './schemas/meeting.schema';
import { CreateMeetingDto } from './dto/create-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(@InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>) {}

  create(dto: CreateMeetingDto) {
    return new this.meetingModel(dto).save();
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
