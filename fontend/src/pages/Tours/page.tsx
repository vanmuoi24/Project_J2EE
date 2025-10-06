import { Breadcrumb, Select, Card } from "antd";
import Container from "@/components/Share/Container";
import { Link } from "react-router-dom";
import useFormattedPath from "@/hooks/useFormattedPath ";

const { Option } = Select;



const ToursPage = () => {
   const paths = useFormattedPath(); 
   console.log(paths)

  return (
    <div className="">
      <Container>

      {/* Breadcrumb */}
      <div className="mb-6">
         <Breadcrumb
            items={[
            {
               title: 'Home',
            },
            {
               title: <Link to="/tours">{paths[0]}</Link>,
            },
            {
               title: <Link to={`/tours/${paths[1].toLowerCase()}`}>{paths[1]}</Link>,
            },
            {
               title: 'Du lịch :dest',
            },
            ]}
            params={{dest: paths[2]}}
         />
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Danh sách Tour du lịch
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Khám phá các hành trình hấp dẫn với mức giá tốt nhất, cùng những
          điểm đến nổi bật trong và ngoài nước.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div className="w-full lg:w-1/4 bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Bộ lọc</h2>
          <div className="space-y-3">
            <Select placeholder="Chọn khu vực" className="w-full" allowClear>
              <Option value="mien-bac">Miền Bắc</Option>
              <Option value="mien-trung">Miền Trung</Option>
              <Option value="mien-nam">Miền Nam</Option>
            </Select>

            <Select placeholder="Khoảng giá" className="w-full" allowClear>
              <Option value="1">Dưới 2 triệu</Option>
              <Option value="2">2 - 5 triệu</Option>
              <Option value="3">Trên 5 triệu</Option>
            </Select>
          </div>
        </div>

        {/* Tours List */}
        <div className="w-full lg:w-3/4 bg-white p-5 rounded-2xl shadow-md">
          {/* Sort */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tất cả các tour</h2>
            <Select defaultValue="popular" className="w-48">
              <Option value="popular">Phổ biến nhất</Option>
              <Option value="newest">Mới nhất</Option>
              <Option value="priceLow">Giá thấp đến cao</Option>
              <Option value="priceHigh">Giá cao đến thấp</Option>
            </Select>
          </div>

          {/* List */}
          <ul className="flex flex-wrap gap-5">
            {[1, 2, 3, 4, 5, 6].map((tour) => (
              <li key={tour} className="w-full sm:w-[48%] lg:w-[31%]">
                <Card
                  hoverable
                  cover={
                    <img
                      alt="Tour"
                      src={`https://picsum.photos/400/250?random=${tour}`}
                      className="rounded-t-2xl h-[200px] object-cover"
                    />
                  }
                  className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Tour #{tour}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Hành trình khám phá Việt Nam
                  </p>
                  <p className="text-blue-600 font-semibold">2.500.000₫</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </Container>
    
    </div>

    
  );
};

export default ToursPage;
