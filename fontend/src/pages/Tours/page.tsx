import Container from '@/components/Share/Container';
import Filter from '@/components/Tours/Filter/Filter';
import Sort from '@/components/Tours/Content/Sort/Sort';
import List from '@/components/Tours/Content/List/List';
import { Divider } from 'antd/lib';
import { useState } from 'react';
import type { ITour } from '@/types/Tour';
import { Pagination } from 'antd';

const ToursPage = () => {
  const [tours, setTours] = useState<ITour[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalTours = 20;
  const PAGE_SIZE = 10;

  return (
    <div className="">
      <Container>
        <div className="text-center !mt-10 !mb-20">
          <h1 className="text-4xl !font-[600] text-gray-800 !mb-10">DANH SÁCH TOUR PHỔ BIẾN</h1>
          <p className="text-[16px] text-gray-500 text-center">
            Khám phá các hành trình hấp dẫn với mức giá tốt nhất, cùng những điểm đến nổi bật trong
            và ngoài nước.
          </p>
        </div>
        <div className="flex flex-row gap-6 !mb-4">
          <div className="flex-3">
            <p className="text-[16px] font-bold">BỘ LỌC TÌM KIẾM</p>
          </div>
          <div className="flex-11 flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="text-[16px]">
                Kết quả có <strong className="text-blue-400 text-2xl">12</strong> chương trình tour
                cho quý khách
              </div>
              <Sort tours={tours} />
            </div>
            <Divider className="!mt-4 !mb-6" />
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex-3">
            <Filter tours={tours} />
          </div>
          <div className="flex-11">
            <List tours={tours} />
            <div className="flex justify-center !mt-8 !mb-[80px]">
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={totalTours}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ToursPage;
