import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import product from "../../service/product";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function ProductsToSee() {
  const { productId } = useParams();
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const response = await product.getById(productId);
      if (response.status === 200 && response?.data) {
        setData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="flex items-center w-[50%] pl-40 mt-40 gap-4 w-full">
        <Swiper
        spaceBetween={30}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.image_url?.length && data?.image_url.map(img => {
          return  <SwiperSlide key={img}>
            <img src={img} className="block w-[100%]" alt="photo" />
          </SwiperSlide>
            })} 
      </Swiper>
      <div className="text-xl ml-20 w-full font-serif">
        <h3 className="mb-5 font-bold">          
          <span className="text-sky-600 font-serif text-4xl">{data.product_name}</span>
        </h3>
        <p>
          <span className="font-bold mr-4 text-2xl">Description :</span>
          <span className="text-sky-600">{data.description}</span>
        </p>
        <p>
          <span className="font-bold mr-4 text-2xl">Made in :</span>
          <span className="text-sky-600">{data.made_in}</span>
        </p>
        <p>
          <span className="font-bold mr-4 text-2xl">Color :</span>
          <span className="text-sky-600">{data.color}</span>
        </p>
        <p>
          <span className="font-bold mr-4 text-2xl">Size :</span>
          <span className="text-sky-600">{data.size}</span>
        </p>
        <p>
          <span className="font-bold mr-4 text-2xl">Count :</span>
          <span className="text-sky-600">{data.count}</span>
        </p>
        <p>
          <span className="font-bold mr-4 text-2xl">Cost : </span>
          <span className="text-sky-600">{data.cost}</span>
        </p>
        <p>
          <span className="font-bold mr-4 text-2xl">Discount :</span>
          <span className="text-sky-600">{data.discount}</span>
        </p>
        <p>
          <span className="font-bold mr-4 text-2xl">For Gender :</span>
          <span className="text-sky-600">{data.for_gender}</span>
        </p>
       
      </div>
      
    </div>
  );
}

export default ProductsToSee;
