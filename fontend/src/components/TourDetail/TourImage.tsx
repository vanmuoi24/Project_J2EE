import { Image, Row, Col, Carousel, Button } from "antd";
import { useState, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface TourImagesProps {
  imageIds: string[];
}

export default function TourImages({ imageIds }: TourImagesProps) {
  if (!imageIds || imageIds.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const carouselRef = useRef<any>(null);

  const sideImages = imageIds;

  const handleSelectImage = (index: number) => {
    setActiveIndex(index);
    carouselRef.current?.goTo(index);
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? imageIds.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    const nextIndex = activeIndex === imageIds.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
    carouselRef.current?.next();
  };

  const handleImageClick = () => {
    setIsPreviewVisible(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewVisible(false);
  };

  return (
    <Row gutter={12}>
      {/* Cột nhỏ ảnh */}
      <Col span={6}>
        <Row gutter={[0, 12]}>
          {sideImages.map((img, idx) => (
            <Col span={24} key={idx}>
              <Image
                src={img}
                height={80}
                style={{
                  width: "100%",
                  borderRadius: 4,
                  cursor: "pointer",
                  border: idx === activeIndex ? "2px solid #0B5DA7" : "2px solid transparent",
                  objectFit: "cover"
                }}
                onClick={() => handleSelectImage(idx)}
                preview={{
                  visible: isPreviewVisible && idx === activeIndex,
                  onVisibleChange: (visible) => {
                    if (!visible) handlePreviewClose();
                  },
                  mask: null // Ẩn mask trên thumbnail
                }}
              />
            </Col>
          ))}
        </Row>
      </Col>

      {/* Ảnh lớn với Carousel */}
      <Col span={18}>
        <div style={{ position: "relative" }}>
          <Carousel
            ref={carouselRef}
            dots={false}
            afterChange={(current) => setActiveIndex(current)}
            arrows={false}
          >
            {sideImages.map((img, idx) => (
              <div key={idx}>
                <Image
                  src={img}
                  height={435}
                  width="100%"
                  style={{ 
                    borderRadius: 4,
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                  onClick={handleImageClick}
                  preview={{
                    visible: isPreviewVisible && idx === activeIndex,
                    onVisibleChange: (visible) => {
                      if (!visible) handlePreviewClose();
                    },
                    mask: null, // Ẩn icon preview mặc định
                    src: img
                  }}
                />
              </div>
            ))}
          </Carousel>

          {/* Custom arrows */}
          {imageIds.length > 1 && (
            <>
              <Button
                type="primary"
                shape="circle"
                icon={<LeftOutlined />}
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "rgba(255, 255, 255, 0.9)",
                  color: "#0B5DA7",
                  border: "none",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<RightOutlined />}
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "rgba(255, 255, 255, 0.9)",
                  color: "#0B5DA7",
                  border: "none",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                }}
              />
            </>
          )}
        </div>
      </Col>

      {/* Preview tất cả ảnh */}
      <Image.PreviewGroup
        preview={{
          visible: isPreviewVisible,
          onVisibleChange: (visible) => {
            if (!visible) handlePreviewClose();
          },
          current: activeIndex,
          onChange: (current) => {
            setActiveIndex(current);
            carouselRef.current?.goTo(current);
          }
        }}
      >
        {sideImages.map((img, idx) => (
          <Image key={idx} src={img} style={{ display: 'none' }} />
        ))}
      </Image.PreviewGroup>
    </Row>
  );
}