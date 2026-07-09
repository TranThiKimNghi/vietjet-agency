export type BookingStatus = 'Đã xác nhận' | 'Chờ' | 'Huỷ';

export type Booking = {
  id: string;
  passenger: string;
  from: string;
  to: string;
  date: string;
  seat: string;
  status: BookingStatus;
  price: number;
};
