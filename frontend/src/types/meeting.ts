export interface Meeting {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CreateMeetingDto {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  message: string;
}
