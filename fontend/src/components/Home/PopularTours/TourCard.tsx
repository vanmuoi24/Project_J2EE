import React, { memo } from 'react';
import type { ITour } from '@/types/Tour';
import { formatCurrencyVND } from '@/utils';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import dayjs from 'dayjs';

const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/400x200?text=No+Image';

interface TourCardProps {
  tour: ITour;
  onBooking: (id: number) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onBooking }) => {
  const imageUrl =
    tour.imageIds && tour.imageIds.length > 0 ? tour.imageIds[0] : FALLBACK_IMAGE_URL;

  const nightDuration = tour.duration > 0 ? tour.duration - 1 : 0;

  const displayDate = dayjs().format('DD/MM/YYYY'); // <-- Cần thay thế bằng dữ liệu động

  return (
    <div className="!py-2 !px-[8px]">
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white">
        <div className="relative">
          <img
            src={imageUrl}
            alt={tour.tourTitle || 'Tour image'}
            className="w-full h-[200px] object-cover"
          />
        </div>

        <div className="!p-[16px]">
          <h3 className="text-[18px] font-[600] !mb-0 h-[54px] overflow-hidden">
            {tour.tourTitle}
          </h3>
          <p className="!px-0 !py-[4px] truncate">
            <NumberOutlined /> <b>ID:</b> {tour.id}
          </p>
          <p className="!px-0 !py-[4px] truncate">
            <EnvironmentOutlined /> <b>Departs from:</b> {tour.departureCity.city}
          </p>
          <p className="!px-0 !py-[4px] truncate">
            <CalendarOutlined /> <b>Departure dates:</b> {displayDate}
          </p>
          <p className="!px-0 !py-[4px] truncate">
            <FieldTimeOutlined /> <b>Duration:</b> {tour.duration} ngày {nightDuration} đêm
          </p>

          <div className="!mt-[12px] flex justify-between items-center">
            <span className="text-[18px] font-bold text-[#e63946]">
              {formatCurrencyVND(tour.basePrice)}
            </span>
            <Button type="primary" onClick={() => onBooking(tour.id)}>
              Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TourCard);
