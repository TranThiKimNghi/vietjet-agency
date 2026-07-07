export type Statistic = {
  title: string;
  value: string;
  description: string;
};

export type ActivityStatus = 'Xác nhận' | 'Đang chờ' | 'Hoàn thành';

export type Activity = {
  bookingCode: string;
  customer: string;
  route: string;
  bookedAt: string;
  status: ActivityStatus;
};

export type FlightStatus =
  | 'Đã mở cửa'
  | 'Trễ'
  | 'Đã đóng cửa'
  | 'Giờ cất cánh'
  | 'Sắp khởi hành';

export type FlightType = 'Nội địa' | 'Quốc tế';

export type Flight = {
  flightCode: string;
  route: string;
  departureTime: string;
  gate: string;
  status: FlightStatus;
  flightType: FlightType;
  price: number;
};
