import { Flex } from "antd"
import Container from "@/components/Share/Container"
import Tag  from "./Tag"
import tag1 from '@/assets/images/tag1.webp'
import tag2 from '@/assets/images/tag2.webp'
import tag3 from '@/assets/images/tag3.webp'
import tag4 from '@/assets/images/tag4.webp'
import tag5 from '@/assets/images/tag5.webp'
import tag6 from '@/assets/images/tag6.webp'
import VouchersSlider from "./VoucherSlider"

const Slide = () => {
  return (
    <div>
      <Container>
        <div className="tag" style={{width: '40%', margin: '0 auto'}}>
          <Flex justify="center" gap={40}>
            <Tag img={tag1} title="TOUR THÁI LAN" />
            <Tag img={tag2} title="Tag 2" />
            <Tag img={tag3} title="Tag 3" />
            <Tag img={tag4} title="Tag 4" />
            <Tag img={tag5} title="Tag 5" />
            <Tag img={tag6} title="Tag 6" />
          </Flex>
        </div>
        <div className="slider" style={{marginBottom: 100}}>
          <VouchersSlider/>
        </div>
      </Container>
    </div>
  )
}

export default Slide