import Container from "@/components/Share/Container";
import Slider from "react-slick";

const Explore = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const destinations = [
    { id: 1, name: "Đà Nẵng", img: "https://picsum.photos/400/250?random=1" },
    { id: 2, name: "Hội An", img: "https://picsum.photos/400/250?random=2" },
    { id: 3, name: "Nha Trang", img: "https://picsum.photos/400/250?random=3" },
    { id: 4, name: "Phú Quốc", img: "https://picsum.photos/400/250?random=4" },
    { id: 5, name: "Hạ Long", img: "https://picsum.photos/400/250?random=5" },
  ];

  return (
    <div style={{marginBottom: 80}} >
      <Container>
         {/* Title */}
         <div style={{ marginBottom: 12 }}>
         <h2
            style={{
               fontSize: 32,
               fontWeight: 700,
               color: "#0b5da7",
               marginBottom: 8,
               textTransform: 'uppercase'
            }}
         >
            Discover Amazing Adventures with Vietravel
         </h2>
         <div
            style={{
               width: 60,
               height: 4,
               backgroundColor: "#0b5da7",
               borderRadius: 2,
            }}
         />
         </div>

         {/* Description */}
         <p style={{
            fontSize: 20,         
            lineHeight: 1.6,      
            color: "#444",
            marginBottom: 24,
            maxWidth: 720
         }}>
         Embark on a Journey of a Lifetime – Create Unforgettable Memories Around the World!
         </p>

         {/* Slider */}
         <Slider {...settings}>
         {destinations.map((item) => (
            <div key={item.id} style={{ padding: "0 8px" }}>
               <div
               style={{
                  width: '97%',
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  background: "#fff",
                  position: 'relative'
               }}
               >
                  <img
                     src={item.img}
                     alt={item.name}
                     style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                     }}
                  />
                  <div
                     style={{
                        margin: 0,
                        padding: "12px",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#fff",
                        textAlign: 'center',
                        display: 'block',
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        textTransform: 'uppercase',
                        background: 'linear-gradient(0deg, rgba(0, 0, 0, .85), transparent);'
                     }}
                  >
                     {item.name}
                  </div>
               </div>
            </div>
         ))}
         </Slider>
      </Container>

    </div>
  );
};

export default Explore;
