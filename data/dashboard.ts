import { Activity, Flight, Statistic } from '@/types/dashboard';

export const statistics: Statistic[] = [
  {
    title: 'Đặt vé',
    value: '24',
    description: 'Đơn đặt vé mới hôm nay',
  },
  {
    title: 'Khách hàng',
    value: '128',
    description: 'Khách hàng đã đăng ký',
  },
  {
    title: 'Chuyến bay',
    value: '12',
    description: 'Chuyến bay đang hoạt động',
  },
  {
    title: 'Doanh thu',
    value: '1.250.000.000',
    description: 'Doanh thu dự kiến hôm nay',
  },
  {
    title: 'Hành khách',
    value: '973',
    description: 'Hành khách đã bay trong ngày',
  },
  {
    title: 'Chuyến bay quốc tế',
    value: '8',
    description: 'Chuyến quốc tế đang vận hành',
  },
  {
    title: 'Tỷ lệ đặt chỗ',
    value: '88%',
    description: 'Tỷ lệ lấp đầy trung bình',
  },
];

export const recentActivities: Activity[] = [
  {
    bookingCode: 'VJ-8321',
    customer: 'Nguyễn Văn A',
    route: 'SGN → HAN',
    bookedAt: '10:24 · 06/07/2026',
    status: 'Xác nhận',
  },
  {
    bookingCode: 'VJ-9274',
    customer: 'Lê Thị B',
    route: 'DAD → SGN',
    bookedAt: '09:10 · 06/07/2026',
    status: 'Đang chờ',
  },
  {
    bookingCode: 'VJ-7150',
    customer: 'Trần Văn C',
    route: 'SGN → CXR',
    bookedAt: '08:52 · 06/07/2026',
    status: 'Hoàn thành',
  },
  {
    bookingCode: 'VJ-6451',
    customer: 'Phạm Thị D',
    route: 'HAN → SGN',
    bookedAt: '08:15 · 06/07/2026',
    status: 'Xác nhận',
  },
  {
    bookingCode: 'VJ-5832',
    customer: 'Ngô Văn E',
    route: 'SGN → DAD',
    bookedAt: '07:45 · 06/07/2026',
    status: 'Đang chờ',
  },
];

export const upcomingFlights: Flight[] = [
  {
    flightCode: 'VJ-8301',
    route: 'SGN → HAN',
    departureTime: '11:30',
    gate: 'A4',
    status: 'Đã mở cửa',
  },
  {
    flightCode: 'VJ-7245',
    route: 'DAD → SGN',
    departureTime: '12:15',
    gate: 'B7',
    status: 'Trễ',
  },
  {
    flightCode: 'VJ-6112',
    route: 'SGN → CXR',
    departureTime: '12:50',
    gate: 'C2',
    status: 'Đã đóng cửa',
  },
  {
    flightCode: 'VJ-9903',
    route: 'HAN → SGN',
    departureTime: '13:10',
    gate: 'D1',
    status: 'Giờ cất cánh',
  },
  {
    flightCode: 'VJ-5588',
    route: 'SGN → DAD',
    departureTime: '13:45',
    gate: 'E5',
    status: 'Sắp khởi hành',
  },
];
