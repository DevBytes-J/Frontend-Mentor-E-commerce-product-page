import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import cart from "../assets/images/icon-cart.svg";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import ImageSwiper from "./ImageSwiper";
import Modal from "./Modal";

const images = [image1, image2, image3, image4];

type ProductPageProps = {
  handleAddToCart: (
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) => void;
};

export default function ProductPage({ handleAddToCart }: ProductPageProps) {
  const [quantity, setQuantity] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="md:px-12 lg:p-24 flex flex-col md:flex-row gap-8 lg:gap-32 items-center justify-center w-full max-w-[1200px] mx-auto">
      {/* Images Section */}
      <div className="flex flex-col md:w-1/2 w-full md:p-0">
        {/* Mobile Swiper */}
        <div className="md:hidden ">
          <ImageSwiper
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>

        {/* Desktop Image */}
        <div
          className="hidden md:block w-full cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={images[selectedImage]}
            alt="Product"
            className="w-full h-auto md:rounded-xl object-cover"
          />
        </div>

        {/* Thumbnails (Desktop only) */}
        <div className="hidden md:flex gap-8 mt-4 flex-wrap justify-center items-center">
          {images.map((img, index) => (
            <div
              key={index}
              className={`w-1/4 max-w-[80px] rounded-lg overflow-hidden cursor-pointer border-2 transition-opacity duration-200 ${
                index === selectedImage
                  ? "border-[#FF7D1A] opacity-75"
                  : "border-transparent hover:opacity-75"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ aspectRatio: "1/1" }}
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <Modal images={images} onClose={() => setLightboxOpen(false)} />
        )}
      </div>

      {/* Product Info Section */}
      <div className="md:w-2/4 w-[80%]">
        <div className="flex flex-col gap-4 w-full">
          <p className="text-[#68707d] font-bold">SNEAKER COMPANY</p>
          <h1 className="font-bold text-[30px] md:text-5xl">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-gray-500 mt-2">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="flex flex-row md:flex-col justify-between mt-2 md:gap-4 md:items-start">
            <div className="flex gap-3 items-center">
              <p className="font-bold text-[30px] md:text-4xl">$125.00</p>
              <p className="bg-black px-3 py-[2px] text-white rounded-[8px]">
                50%
              </p>
            </div>
            <p className="text-gray-500 line-through">$250.00</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 w-full items-stretch">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <button
              onClick={() => handleAddToCart(quantity, setQuantity)}
              className="md:flex-1 bg-[#FF7D1A] text-black py-4 px-4 rounded-md font-bold hover:bg-[#FFEDE0] hover:cursor-pointer transition flex items-center justify-center gap-2 w-full"
            >
              <img src={cart} alt="Cart" className="w-4 h-4" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
