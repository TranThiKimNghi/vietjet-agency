import { Booking } from '@/types/booking';

export const bookingList: Booking[] = [
  {
    id: 'BKG-001',
    passenger: 'Nguyễn Văn A',
    from: 'Hà Nội',
    to: 'TP. Hồ Chí Minh',
    date: '2026-08-10',
    seat: 'Economy',
    status: 'Đã xác nhận',
    price: 1299000,
  },
  {
    id: 'BKG-002',
    passenger: 'Trần Thị B',
    from: 'Đà Nẵng',
    to: 'Hải Phòng',
    date: '2026-08-12',
    seat: 'Business',
    status: 'Chờ',
    price: 1899000,
  },
  {
    id: 'BKG-003',
    passenger: 'Lê Thị C',
    from: 'Nha Trang',
    to: 'Đà Lạt',
    date: '2026-08-15',
    seat: 'Economy',
    status: 'Huỷ',
    price: 980000,
  },
  {
    id: 'BKG-004',
    passenger: 'Phạm Văn D',
    from: 'Cần Thơ',
    to: 'Hải Phòng',
    date: '2026-08-18',
    seat: 'Economy',
    status: 'Đã xác nhận',
    price: 1499000,
  },
];
