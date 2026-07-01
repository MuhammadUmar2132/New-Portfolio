import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}

  async get() {
    const profile = await this.profileModel.findOne().exec();
    return profile ?? { avatarUrl: undefined };
  }

  update(dto: UpdateProfileDto) {
    return this.profileModel
      .findOneAndUpdate({}, dto, { new: true, upsert: true })
      .exec();
  }
}
