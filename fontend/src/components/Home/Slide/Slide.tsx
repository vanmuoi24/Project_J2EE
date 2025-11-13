import { Flex } from 'antd';
import Container from '@/components/Share/Container';
import Tag from './Tag';
import tag1 from '@/assets/images/tag1.webp';
import tag2 from '@/assets/images/tag2.webp';
import tag3 from '@/assets/images/tag3.webp';
import tag4 from '@/assets/images/tag4.webp';
import tag5 from '@/assets/images/tag5.webp';
import tag6 from '@/assets/images/tag6.webp';
import VouchersSlider from './VoucherSlider';

const Slide = () => {
  return (
    <div>
      <Container>
        {/* <div className="tag" style={{width: '40%', margin: '0 auto'}}>
          <Flex justify="center" gap={40}>
            <Tag img={tag1} title="TOUR THÁI LAN" />
            <Tag img={tag2} title="Tag 2" />
            <Tag img={tag3} title="Tag 3" />
            <Tag img={tag4} title="Tag 4" />
            <Tag img={tag5} title="Tag 5" />
            <Tag img={tag6} title="Tag 6" />
          </Flex>
        </div> */}
        <div className="slider" style={{ marginBottom: 100 }}>
          {/* <div className="!mb-[12px]">
            <h2 className="text-[32px] font-bold uppercase text-[#7BBCB0] !mb-0">
              CHUYẾN ĐI HẤP DẪN
            </h2>
            <div className="w-[60px] h-[4px] bg-[#FFDA32] rounded-[2px]" />
          </div>
          <p className="text-[18px] text-[#666] !mb-[24px] max-w-[720px]">
            Khám phá các chuyến tham quan được xếp hạng hàng đầu của chúng tôi và tìm nguồn cảm hứng
            cho hành trình tiếp theo của bạn.
          </p> */}
          <VouchersSlider />
        </div>
      </Container>
    </div>
  );
};

export default Slide;
