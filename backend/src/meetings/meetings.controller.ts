import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  // Public - anyone can book
  @Post()
  create(@Body() dto: CreateMeetingDto) { return this.meetingsService.create(dto); }

  // Admin only
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() { return this.meetingsService.findAll(); }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  updateStatus(@Param('id') id: string, @Body('status') status: 'pending' | 'confirmed' | 'cancelled') {
    return this.meetingsService.updateStatus(id, status);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) { return this.meetingsService.remove(id); }
}
