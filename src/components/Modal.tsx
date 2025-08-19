// LightboxModal.tsx
import { useState, useEffect } from "react";
import ImageSwiper from "./ImageSwiper";

type LightboxModalProps = {
  images: string[];
  onClose: () => void;
};

export default function LightboxModal({ images, onClose }: LightboxModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Track screen size so modal only shows for tablet/desktop
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isDesktop) return null; 

  return (
    <div className="fixed inset-0 bg-black/35 bg-opacity-75 flex items-center justify-center z-[100] px-4">
      <div className="relative max-w-xl w-full rounded-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[#FF7D1A] transition cursor-pointer" 
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Swiper */}
        <div className="w-full">
          <ImageSwiper
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>

        {/* Thumbnails (Desktop/Tablet only) */}
        <div className="hidden md:flex gap-4 mt-4 flex-wrap justify-center items-center">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-15 md:w-20 lg:w-20 rounded-lg cursor-pointer border-2 object-cover 
                transition-opacity duration-200
                ${
                  index === selectedImage
                    ? "border-[#FF7D1A] opacity-50"
                    : "border-transparent hover:opacity-50"
                }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
